import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


function EventForm({ mode = "creator", formId = null }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Load draft from local storage or backend on mount
  useEffect(() => {
    // Try local storage first
    const localDraft = localStorage.getItem(`formDraft_${formId || "new"}`);
    if (localDraft) {
      const { formName, fields } = JSON.parse(localDraft);
      setFormName(formName);
      setFields(fields);
    } else if (formId && mode === "creator") {
      // Load from backend if editing existing form
      fetch(`/api/forms/${formId}`)
        .then(res => res.json())
        .then(data => {
          setFormName(data.title);
          setFields(data.fields);
        });
    }
  }, [formId, mode]);

  // 2. Auto-save to local storage on changes
  useEffect(() => {
    if (fields.length > 0 || formName) {
      localStorage.setItem(
        `formDraft_${formId || "new"}`,
        JSON.stringify({ formName, fields })
      );
    }
  }, [formName, fields, formId]);

  // Field management functions
  const addQuestion = (type) => {
    const newQuestion = {
      type,
      title: `Question ${fields.length + 1}`,
      name: `q${fields.length + 1}`,
      required: false,
      options: type === 'radio' || type === 'checkbox' 
        ? [{ label: "Option 1", value: "option1" }] 
        : []
    };
    setFields([...fields, newQuestion]);
  };

  const removeQuestion = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const addOption = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.push({
      label: `Option ${updatedFields[fieldIndex].options.length + 1}`,
      value: `option${updatedFields[fieldIndex].options.length + 1}`
    });
    setFields(updatedFields);
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex].label = value;
    setFields(updatedFields);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };

  // Form submission
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const url = mode === 'creator' 
        ? '/api/forms' 
        : `/api/forms/${formId}/submissions`;
      
      const response = await fetch(url, {
        method: mode === 'creator' ? 'POST' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formName,
          fields,
          ...(mode === 'user' && { responses: formData }),
          isDraft: false
        }),
      });

      if (response.ok) {
        toast.success(mode === 'creator' ? 'Form published!' : 'Response submitted!');
        localStorage.removeItem(`formDraft_${formId || "new"}`);
      }
    } catch (error) {
      toast.error('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    setIsSubmitting(true);
    await fetch('/api/forms/drafts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formId, title: formName, fields, isDraft: true }),
    });
    toast.success('Draft saved!');
    setIsSubmitting(false);
  };

  // Render field based on type
  const renderField = (field, fieldIndex) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            {...register(field.name, { required: field.required })}
            className="w-full p-2 border rounded"
            disabled={mode === 'creator'}
            placeholder={mode === 'creator' ? 'User will see this' : 'Your answer'}
          />
        );
      
      case 'radio':
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option, optionIndex) => (
              <div key={option.value} className="flex items-center">
                <input
                  type={field.type}
                  {...register(field.name, { required: field.required })}
                  value={option.value}
                  className="mr-2"
                  disabled={mode === 'creator'}
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
                      className="ml-2 text-red-500"
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
                className="text-sm text-blue-600 mt-1"
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
            className="w-full p-2 border rounded"
            placeholder="My Event Form"
          />
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.name} className="mb-6 p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">
                {field.title} {field.required && <span className="text-red-500">*</span>}
              </label>
              {mode === 'creator' && (
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            {renderField(field, index)}
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>
        ))}

        {/* Creator Controls */}
        {mode === 'creator' && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              onClick={() => addQuestion('text')}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded"
            >
              + Text
            </button>
            <button
              type="button"
              onClick={() => addQuestion('radio')}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded"
            >
              + Radio
            </button>
            <button
              type="button"
              onClick={() => addQuestion('checkbox')}
              className="px-3 py-1 bg-green-100 text-green-800 rounded"
            >
              + Checkbox
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {mode === 'creator' && (
            <button
              type="button"
              onClick={saveDraft}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Save Draft
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isSubmitting ? 'Saving...' : mode === 'creator' ? 'Publish' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;