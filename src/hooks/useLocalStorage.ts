import { useState, useEffect } from "react";
const isBrowser = typeof window !== "undefined";
// 定义 useLocalStorage 钩子的泛型版本
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 从 localStorage 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      console.log("localStorage ", item);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser) return;

    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  // 保存值到 localStorage 和状态变量
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许值是一个函数，这样我们就可以有相同的 API 作为 useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // 保存状态
      setStoredValue(valueToStore);
      // 保存到 localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const removeAll = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue); // 重置到初始值
  };

  return [storedValue, setValue, removeAll];
}
