'use client';

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateArticleModal({ isOpen, onClose }: CreateArticleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
        
        {/* Form will go here in next step */}
        
        <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button className="bg-saitBlue text-white px-4 py-2 rounded-md hover:bg-saitLightBlue">
            Create Article
          </button>
        </div>
      </div>
    </div>
  );
}