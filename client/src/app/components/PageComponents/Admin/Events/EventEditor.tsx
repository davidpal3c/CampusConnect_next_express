import { useForm, Controller } from 'react-hook-form';

type EventData = {
  name: string;
  date: string;
  location: string;
  audience: string;
  programs: string;
  description: string;
  host: string;
  contact: string;
  capacity: number;
};

type EventEditorProps = {
  defaultValues?: Partial<EventData>;
  onSubmit: (data: EventData) => void;
};

const EventEditor: React.FC<EventEditorProps> = ({ defaultValues, onSubmit }) => {
  const departments = ['Software Dev', 'Human Resources', 'Business', 'Marketing'];
  const programOptions = ['Program A', 'Program B', 'Program C', 'Program D'];

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<EventData>({
    defaultValues: {
      name: '',
      date: '',
      location: '',
      audience: '',
      programs: '',
      description: '',
      host: '',
      contact: '',
      capacity: 0,
      ...defaultValues,
    },
  });

  const formData = watch();

  const handleFormSubmit = (data: EventData) => {
    onSubmit(data);
  };

  return (
    <div className="flex p-4 gap-4 bg-gray-100 min-h-screen">
      {/* Preview Panel */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        
        <PreviewField label="Name" value={formData.name} required />
        <PreviewField label="Date" value={formData.date} required />
        <PreviewField label="Location" value={formData.location} required />
        <PreviewField label="Audience" value={formData.audience} />
        <PreviewField label="Programs" value={formData.programs} />
        <PreviewField label="Description" value={formData.description} />
        <PreviewField label="Host" value={formData.host} />
        <PreviewField label="Capacity" value={formData.capacity?.toString()} required />
        <PreviewField label="Image File" value="Default Image File is empty." />
      </div>
      
      {/* Form Section */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-3/4 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-6">
          {/* Name and Image */}
          <div>
            <FormLabel htmlFor="name" required>Name</FormLabel>
            <FormInput
              id="name"
              type="text"
              placeholder="Enter name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel htmlFor="image">Image</FormLabel>
              <button 
                type="button"
                className="bg-blue-400 text-white p-2 rounded w-full hover:bg-blue-500 transition-colors"
              >
                Upload File
              </button>
            </div>
            
            <div>
              <FormLabel htmlFor="date" required>Date</FormLabel>
              <FormInput
                  id="date"
                  type="datetime-local"
                  {...register('date', { 
                    required: 'Date is required',
                    validate: (value) => {
                      if (!value) return true;
                      return !isNaN(new Date(value).getTime()) || 'Invalid date';
                    }
                  })}
                  error={errors.date?.message}
                />
            </div>
          </div>
          
          {/* Location and Target Department */}
          <div>
            <FormLabel htmlFor="location" required>Location</FormLabel>
            <FormInput
              id="location"
              type="text"
              placeholder="Enter Location"
              {...register('location', { required: 'Location is required' })}
              error={errors.location?.message}
            />
          </div>

          <div>
            <FormLabel htmlFor="audience">Target Department(s)</FormLabel>
            <Controller
              name="audience"
              control={control}
              render={({ field }) => (
                <FormSelect
                  id="audience"
                  value={field.value}
                  onChange={field.onChange}
                  options={departments}
                  placeholder="Select Department"
                />
              )}
            />
          </div>
          
          {/* Target Program */}
          <div>
            <FormLabel htmlFor="programs">Target Program(s)</FormLabel>
            <Controller
              name="programs"
              control={control}
              render={({ field }) => (
                <FormSelect
                  id="programs"
                  value={field.value}
                  onChange={field.onChange}
                  options={programOptions}
                  placeholder="Select Program"
                />
              )}
            />
          </div>

          {/* Contact */}
          <div>
            <FormLabel htmlFor="contact">Contact(s)</FormLabel>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <FormSelect
                  id="contact"
                  value={field.value}
                  onChange={field.onChange}
                  options={departments}
                  placeholder="Select Department"
                />
              )}
            />
          </div>
          
          {/* Description */}
          <div className="col-span-2">
            <FormLabel htmlFor="description">Description</FormLabel>
            <textarea
              id="description"
              placeholder="Enter Description"
              {...register('description')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 h-40"
            />
          </div>

          {/* Host and Capacity */}
          <div>
            <FormLabel htmlFor="host">Host</FormLabel>
            <FormInput
              id="host"
              type="text"
              placeholder="Enter Host Name"
              {...register('host')}
            />
          </div>
          
          <div>
            <FormLabel htmlFor="capacity" required>Capacity</FormLabel>
            <Controller
              name="capacity"
              control={control}
              rules={{ 
                required: 'Capacity is required',
                min: { value: 0, message: 'Capacity must be at least 0' }
              }}
              render={({ field }) => (
                <FormInput
                  id="capacity"
                  type="number"
                  placeholder="Enter Number"
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                  min="0"
                  error={errors.capacity?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// Updated Helper Components
const PreviewField: React.FC<{ label: string; value?: string; required?: boolean }> = ({ 
  label, 
  value, 
  required = false 
}) => (
  <div className="mt-4">
    <p className="font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </p>
    <p className="text-gray-600 overflow-hidden text-ellipsis">
      {value || (required ? `${label} field is required.` : `Default ${label.toLowerCase()} is empty.`)}
    </p>
  </div>
);

const FormLabel: React.FC<{ htmlFor: string; required?: boolean; children: React.ReactNode }> = ({ 
  htmlFor, 
  required = false, 
  children 
}) => (
  <label htmlFor={htmlFor} className="block mb-2">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ error, ...props }) => (
  <div>
    <input
      {...props}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface FormSelectProps {
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  placeholder: string;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ 
  id, 
  value, 
  onChange, 
  options, 
  placeholder,
  error 
}) => (
  <div>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default EventEditor;
