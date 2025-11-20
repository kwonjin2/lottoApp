import { useEffect, useState } from 'react';
import { fetchLottoData, LottoDataType } from '../utils/fetchLottoData';

const useLottoData = (drwNo: number) => {
  const [lottoData, setLottoData] = useState<LottoDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(false);
      setError(null);

      const result = await fetchLottoData(drwNo);

      if (result) {
        setLottoData(result);
      } else {
        setError('Failed to fetch data.');
      }
      setIsLoading(false);
    };

    loadData();
  }, [drwNo]);
  return { lottoData, isLoading, error };
};

export default useLottoData;
