import React from 'react';

export const Footer = () => {
  return (
    <div>
      <footer className="text-center text-gray-300 text-sm py-4">
        Copyright © {new Date().getFullYear()} Coogify Inc. All rights reserved.
        <br />
        <div className="pt-2">
          Created by:{' '}
          <a
            className="hover:text-[#B67DFF]"
            href="https://github.com/JacobUH"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jacob Rangel
          </a>
          ,{' '}
          <a
            className="hover:text-[#B67DFF]"
            href="https://github.com/arkhan24-cs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abdul Khan
          </a>
          ,{' '}
          <a
            className="hover:text-[#B67DFF]"
            href="https://github.com/lindolfo1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diego Garza
          </a>
          ,{' '}
          <a
            className="hover:text-[#B67DFF]"
            href="https://github.com/Shruthi1935"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shruthi Yenamagandla
          </a>
          , and{' '}
          <a
            className="hover:text-[#B67DFF]"
            href="https://github.com/EMMAPHA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emma Pham
          </a>
        </div>
      </footer>
    </div>
  );
};
