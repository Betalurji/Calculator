import './index.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as math from 'mathjs';

const Calculator: React.FC = () => {
  const { register } = useForm();
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const evaluateExpression = (expr: string): string => {
    try {
     
      return math.evaluate(expr).toString(); 
    } catch (error) {
      
      return 'Error';
    }
  };

  const handleButtonPress = (value: string) => {
    if (value === '=') {
      const evaluatedResult = evaluateExpression(expression);
      setResult(evaluatedResult);
    } else if (value === 'C') {
      clearExpression();
    } else {
      setExpression(prevExpression => prevExpression + value);
    }
  };

  const clearExpression = () => {
    setExpression('');
    setResult(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-4 bg-gray-300 rounded shadow-lg">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center">
          <input
            className="w-full p-2 mb-2 text-3xl text-right text-black bg-gray-100 border border-gray-400 rounded"
            type="text"
            {...register('expression', { required: true })}
            value={expression}
            readOnly
          />
          <div className="grid grid-cols-4 gap-4"> 
            {['7', '8', '9', '/'].map((value, index) => (
              <button
                key={index}
                className="p-6 text-3xl text-white bg-blue-500 rounded hover:bg-blue-700" 
                onClick={() => handleButtonPress(value)}
              >
                {value}
              </button>
            ))}
            {['4', '5', '6', '*'].map((value, index) => (
              <button
                key={index}
                className="p-6 text-3xl text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => handleButtonPress(value)}
              >
                {value}
              </button>
            ))}
            {['1', '2', '3', '-'].map((value, index) => (
              <button
                key={index}
                className="p-6 text-3xl text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => handleButtonPress(value)}
              >
                {value}
              </button>
            ))}
            {['0', '.', '+', '-'].map((value, index) => (
              <button
                key={index}
                className="p-6 text-3xl text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => handleButtonPress(value)}
              >
                {value}
              </button>
            ))}
            <button
              className="col-span-2 p-6 text-4xl text-white bg-red-500 rounded hover:bg-red-700"
              onClick={() => handleButtonPress('C')}
            >
              Clear
            </button>
            <button
              className="col-span-2 p-6 text-3xl text-white bg-green-500 rounded hover:bg-green-700"
              onClick={() => handleButtonPress('=')}
            >
              =
            </button>
          </div>
          {result !== null && (
            <div className="mb-2 text-3xl text-black">
              {result !== 'Error' && (
                <div>
                  Result: <span className="font-bold">{result}</span>
                </div>
              )}
              {result === 'Error' && <div>Error</div>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Calculator;
