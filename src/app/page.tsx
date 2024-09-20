"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Verify = () => {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = value.slice(0, 1); 

    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    setDigits(newDigits);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newDigits = pastedData.split('').slice(0, 6);
    setDigits(newDigits);
    newDigits.forEach((_, index) => {
      if (newDigits[index] && index < 5) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');

    try {
      const response = await axios.post('/api/verify', { code });

      if (response.status === 200) {
        router.push('/success');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Enter Verification Code</h1>
      <form onSubmit={handleSubmit} onPaste={handlePaste} className="flex gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            id={`digit-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-10 h-10 text-center border border-gray-300 rounded"
          />
        ))}
        <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Verify;
