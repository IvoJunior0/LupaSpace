import React from 'react';
import { useState } from 'react';

import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../config/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons';

export default function File(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = ref(storage, props.filePath);

  const handleDownload = async ()  => {
    setLoading(true);
    setError(null);
    try {
      const url = await getDownloadURL(listRef);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = listRef.name || 'downloaded-file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.log("Erro ao baixar o arquivo: " + err); // Debug
      setError("Erro ao baixar o arquivo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-3 w-full h-full p-3 rounded-md bg-slate-200 border-[3px] border-slate-300 transition-all hover:bg-slate-300 hover:border-slate-400'>
      {props.filePath ? <>
        <h1><FontAwesomeIcon icon={faFile} className='text-4xl'/></h1>
        <div className='flex gap-2'>
          <h1>{listRef.name}</h1>
          <button disabled={loading} onClick={handleDownload}><FontAwesomeIcon icon={faDownload} /></button>
        </div>
        </> : <h1>O post não possui arquivo anexado</h1>}
    </div>
  );
}