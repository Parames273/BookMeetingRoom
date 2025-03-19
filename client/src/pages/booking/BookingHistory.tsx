import React, { useEffect, useState } from 'react';
import BookingTable from './BookingTable';
import axios from 'axios';
import api from '../../api';
import { toast } from 'react-toastify';
import Loader from '../../components/reusable/Loader';

const App: React.FC = () => {

  const [data, setData] = useState<[]>([])
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    getMyHistory()  
  }, [])

  
const getMyHistory = async ()=>{
  try {
    const response = await axios.get(`${api.getHistory}/${12345678}`);
    console.log(response)
    setData(response.data)
    setLoader(false)    
} catch (error: any) {
    setData([])
    setLoader(false)
    toast.error(error.response?.data?.message || 'Failed');
}
}
  if(loader) return <Loader/>
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>
      <BookingTable bookings={data} />
    </div>
  );
};

export default App;