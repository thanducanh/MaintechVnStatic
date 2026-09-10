"use client";
import React from "react";

// Kế thừa toàn bộ thuộc tính chuẩn của thẻ input HTML
interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function NumberInput(props: NumberInputProps) {
    // Hàm chặn nhập chữ, chỉ cho phép nhập số và các phím điều hướng
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter"];
        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <input 
            {...props} 
            onKeyDown={handleKeyDown}
            inputMode="numeric" // Hiển thị bàn phím số trên thiết bị di động
        />
    );
}