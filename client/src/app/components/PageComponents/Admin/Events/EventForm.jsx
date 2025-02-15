import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';

// Separate QuestionCard component with its own state management
const QuestionCard = ({ question, index, onUpdate, onRemove, onMove }) => {
  // Local state for the question text
  const [questionText, setQuestionText] = useState(question.question);
  
  // Local state for options
  const [options, setOptions] = useState(question.options);

  // Handle question text change
  const handleQuestionChange = (e) => {
    const newText = e.target.value;
    setQuestionText(newText);
    onUpdate(question.id, { question: newText });
  };

  // Handle option text change
  const handleOptionChange = (optionIndex, newValue) => {
    const newOptions = [...options];
    newOptions[optionIndex] = newValue;
    setOptions(newOptions);
    onUpdate(question.id, { options: newOptions });
  };

  // Handle adding new option
  const handleAddOption = () => {
    const newOptions = [...options, `Option ${options.length + 1}`];
    setOptions(newOptions);
    onUpdate(question.id, { options: newOptions });
  };

  // Handle removing option
  const handleRemoveOption = (optionIndex) => {
    const newOptions = options.filter((_, index) => index !== optionIndex);
    setOptions(newOptions);
    onUpdate(question.id, { options: newOptions });
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <Input
              type="text"
              value={questionText}
              onChange={handleQuestionChange}
              placeholder="Question text"
              className="mb-4"
            />
            
            {question.type === 'shortAnswer' && (
              <Input disabled placeholder="Short answer text" className="bg-gray-50" />
            )}

            {(question.type === 'multipleChoice' || question.type === 'checkbox' || question.type === 'dropdown') && (
              <div className="space-y-2">
                {options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    {question.type === 'multipleChoice' && (
                      <div className="w-4 h-4 rounded-full border border-gray-300" />
                    )}
                    {question.type === 'checkbox' && (
                      <Checkbox disabled />
                    )}
                    <Input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(optionIndex)}
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={handleAddOption}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMove(question.id, 'up')}
              disabled={index === 0}
            >
              <MoveUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMove(question.id, 'down')}
              disabled={index === 0}
            >
              <MoveDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(question.id)}
              className="text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [questions, setQuestions] = useState([]);

  const questionTypes = [
    { id: 'shortAnswer', label: 'Short Answer' },
    { id: 'multipleChoice', label: 'Multiple Choice' },
    { id: 'dropdown', label: 'Dropdown' },
    { id: 'checkbox', label: 'Checkboxes' }
  ];

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      question: '',
      options: type === 'shortAnswer' ? [] : ['Option 1'],
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const updateQuestion = (questionId, updates) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    ));
  };

  const moveQuestion = (questionId, direction) => {
    const currentIndex = questions.findIndex(q => q.id === questionId);
    if (direction === 'up' && currentIndex > 0) {
      const newQuestions = [...questions];
      [newQuestions[currentIndex], newQuestions[currentIndex - 1]] = 
      [newQuestions[currentIndex - 1], newQuestions[currentIndex]];
      setQuestions(newQuestions);
    } else if (direction === 'down' && currentIndex < questions.length - 1) {
      const newQuestions = [...questions];
      [newQuestions[currentIndex], newQuestions[currentIndex + 1]] = 
      [newQuestions[currentIndex + 1], newQuestions[currentIndex]];
      setQuestions(newQuestions);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <Input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-xl font-bold"
            />
          </CardTitle>
        </CardHeader>
      </Card>

      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          onUpdate={updateQuestion}
          onRemove={removeQuestion}
          onMove={moveQuestion}
        />
      ))}

      <div className="mt-6">
        <Select onValueChange={addQuestion}>
          <SelectTrigger>
            <SelectValue placeholder="Add question" />
          </SelectTrigger>
          <SelectContent>
            {questionTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FormBuilder;