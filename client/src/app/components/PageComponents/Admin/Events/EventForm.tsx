import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormField = {
  type: 'text' | 'radio' | 'checkbox';
  title: string;
  name: `fields.${string}`;
  required: boolean;
  options?: {
    label: string;
    value: string;
  }[];
};

type FormMode = 'creator' | 'user';

type FormValues = {
  formName: string;
  fields: Record<string, string | string[]>;
  formFields: FormField[];
  isDraft?: boolean;
  formId?: string | null;
};

type EventFormProps = {
  mode?: FormMode;
  formId?: string | null;
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
};

const EventForm: React.FC<EventFormProps> = ({ mode = "creator", formId = null }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load form data
  useEffect(() => {
    const loadFormData = async () => {
      const localDraft = localStorage.getItem(`formDraft_${formId || "new"}`);
      
      if (localDraft) {
        try {
          const { formName, fields } = JSON.parse(localDraft);
          setFormName(formName);
          setFields(fields);
        } catch (error) {
          console.error("Error parsing local draft:", error);
        }
      } else if (formId && mode === "creator") {
        try {
          const response = await fetch(`/api/forms/${formId}`);
          if (!response.ok) throw new Error("Failed to fetch form");
          
          const data = await response.json();
          setFormName(data.title);
          setFields(data.fields);
        } catch (error) {
          toast.error("Failed to load form");
          console.error(error);
        }
      }
    };

    loadFormData();
  }, [formId, mode]);

  // Auto-save draft
  useEffect(() => {
    if (fields.length > 0 || formName) {
      localStorage.setItem(
        `formDraft_${formId || "new"}`,
        JSON.stringify({ formName, fields })
      );
    }
  }, [formName, fields, formId]);

  // Field management
  const addQuestion = (type: FormField['type']) => {
    const newQuestion: FormField = {
      type,
      title: `Question ${fields.length + 1}`,
      name: `fields.q${fields.length + 1}`,
      required: false,
      ...(type === 'radio' || type === 'checkbox' ? {
        options: [{ label: "Option 1", value: "option1" }]
      } : {})
    };
    setFields([...fields, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (fieldIndex: number, updates: Partial<FormField>) => {
    setFields(fields.map((field, i) => 
      i === fieldIndex ? { ...field, ...updates } : field
    ));
  };

  const updateOption = (fieldIndex: number, optionIndex: number, label: string) => {
    setFields(fields.map((field, i) => {
      if (i !== fieldIndex || !field.options) return field;
      
      const newOptions = [...field.options];
      newOptions[optionIndex] = { ...newOptions[optionIndex], label };
      
      return { ...field, options: newOptions };
    }));
  };

  const addOption = (fieldIndex: number) => {
    setFields(fields.map((field, i) => {
      if (i !== fieldIndex || !field.options) return field;
      
      const newOption = {
        label: `Option ${field.options.length + 1}`,
        value: `option${field.options.length + 1}`
      };
      
      return { ...field, options: [...field.options, newOption] };
    }));
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    setFields(fields.map((field, i) => {
      if (i !== fieldIndex || !field.options) return field;
      
      const newOptions = [...field.options];
      newOptions.splice(optionIndex, 1);
      
      return { ...field, options: newOptions };
    }));
  };

  // Form submission
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setIsSubmitting(true);
    try {
      const url = mode === 'creator' 
        ? '/api/forms' 
        : `/api/forms/${formId}/submissions`;
      
      const body = {
        title: formName,
        fields,
        ...(mode === 'user' && { responses: formData }),
        isDraft: false
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(response.statusText);

      toast.success(mode === 'creator' ? 'Form published!' : 'Response submitted!');
      localStorage.removeItem(`formDraft_${formId || "new"}`);
    } catch (error) {
      toast.error('Submission failed');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/forms/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, title: formName, fields, isDraft: true }),
      });
      toast.success('Draft saved!');
    } catch (error) {
      toast.error('Failed to save draft');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render field based on type
  const renderField = (field: FormField, fieldIndex: number) => {
    const commonProps = {
      ...register(field.name, { required: field.required }),
      disabled: mode === 'creator',
      className: "w-full p-2 border rounded"
    };

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={mode === 'creator' ? 'User will see this' : 'Your answer'}
            {...commonProps}
          />
        );
      
      case 'radio':
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, optionIndex) => (
              <div key={option.value} className="flex items-center">
                <input
                  type={field.type}
                  value={option.value}
                  {...commonProps}
                />
                
                {mode === 'creator' ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => updateOption(fieldIndex, optionIndex, e.target.value)}
                      className="p-1 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(fieldIndex, optionIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label="Remove option"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label>{option.label}</label>
                )}
              </div>
            ))}
            
            {mode === 'creator' && (
              <button
                type="button"
                onClick={() => addOption(fieldIndex)}
                className="text-sm text-blue-600 hover:text-blue-800 mt-1"
              >
                + Add Option
              </button>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Form Title */}
      {mode === 'creator' && (
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Form Name</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="My Event Form"
          />
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={`${field.name}-${index}`} className="mb-6 p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-center mb-2">
              {mode === 'creator' ? (
                <input
                  type="text"
                  value={field.title}
                  onChange={(e) => updateField(index, { title: e.target.value })}
                  className="p-1 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              ) : (
                <label className="font-medium">
                  {field.title} {field.required && <span className="text-red-500">*</span>}
                </label>
              )}

              {mode === 'creator' && (
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  aria-label="Remove question"
                >
                  Remove
                </button>
              )}
            </div>
            
            {renderField(field, index)}
            
            {errors.fields?.[field.name] && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>
        ))}

        {/* Creator Controls */}
        {mode === 'creator' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {(['text', 'radio', 'checkbox'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addQuestion(type)}
                className={`px-3 py-1 rounded hover:opacity-90 ${
                  type === 'text' ? 'bg-blue-100 text-blue-800' :
                  type === 'radio' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}
              >
                + {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {mode === 'creator' && (
            <button
              type="button"
              onClick={saveDraft}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Save Draft
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : mode === 'creator' ? 'Publish Form' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;