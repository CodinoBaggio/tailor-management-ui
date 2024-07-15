import { FC, useRef, useState } from 'react';
import { TextField } from '@mui/material';

interface Props {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

/**
 * インクリメンタルサーチ用に `TextField` を拡張したコンポーネントです。
 *
 * ユーザーの入力に応じて検索 API を呼び出す場合は、`onSearch` ハンドラーを使用します。
 * `onSearch` は、`TextField` の `onChange` よりも適切なタイミングで呼び出されます。
 * 例えば、`onChange` は IME 変換中にも呼び出されてしまいますが、
 * `onSearch` はユーザーが入力を確定したときにしか呼び出されないようになっています。
 */
export const SearchTextField: FC<Props> = ({ placeholder='検索', onSearch }) => {
  // 現在 IME ON（変換中）かどうかのフラグ
  const isImeOn = useRef(false);

  // 以前の入力テキスト（ブラウザによって onChange の振る舞いが微妙に異なるための対策）
  const [prevText, setPrevText] = useState('');

  // 入力テキストを処理する
  const handleChange = (text: string) => {
    if (prevText === text) return;
    if (text === '') {
      // Chrome ではテキストクリア時に onCompositionEnd が呼ばれないことがある
      isImeOn.current = false;
    } else if (isImeOn.current) {
      return; // IME 変換中は何もしない
    }
    setPrevText(text);

    // ここで任意のコールバック関数を呼び出す
    onSearch?.(text);
  };

  return (
    <TextField
      id="search"
      type="search"
      // label="Search"
      variant="standard"
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      onCompositionStart={() => {
        isImeOn.current = true; // IME 入力中フラグを ON
      }}
      onCompositionEnd={(e) => {
        isImeOn.current = false; // IME 入力中フラグを OFF
        handleChange((e.target as HTMLInputElement).value); // 入力確定したとき
      }}
    />
  );
};
