import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Booking {
  _id: string;
  sapId: number;
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface BookingTableProps {
  bookings: Booking[];
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</TableCell>
            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableCell>
            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</TableCell>
            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</TableCell>
            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell className="px-6 py-4 whitespace-nowrap">{booking.roomId}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{booking.date}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{booking.startTime}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{booking.endTime}</TableCell>
              <TableCell
                
              >
                <span className={`px-2 py-2 whitespace-nowrap rounded ${
                  booking.status === 'Pending'
                    ? 'bg-yellow-300'
                    : booking.status === 'Approved'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
                >
                {booking.status}
                </span>
               
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingTable;