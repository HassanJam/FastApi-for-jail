import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ ip: '', jail_name: '', status: '' });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/items/');
        setItems(response.data);
        setFilteredItems(response.data);
        setLoading(false);
      } catch (error) {
        setError('There was an error fetching the items.');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleFilterChange = (value, field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = items;
      Object.keys(filters).forEach((field) => {
        if (filters[field]) {
          filtered = filtered.filter((item) =>
            item[field].toString().toLowerCase().includes(filters[field].toLowerCase())
          );
        }
      });
      setFilteredItems(filtered);
    };

    applyFilters();
  }, [filters, items]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10} color="red">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Item List
      </Typography>

      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="bold" gutterBottom>
                  IP
                </Typography>
                <FormControl size="small" fullWidth>
                  <InputLabel>Filter</InputLabel>
                  <Select
                    value={filters.ip}
                    onChange={(e) => handleFilterChange(e.target.value, 'ip')}
                    label="Filter"
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(items.map((item) => item.ip))).map((ip) => (
                      <MenuItem key={ip} value={ip}>
                        {ip}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="bold" gutterBottom>
                  Jail Name
                </Typography>
                <FormControl size="small" fullWidth>
                  <InputLabel>Filter</InputLabel>
                  <Select
                    value={filters.jail_name}
                    onChange={(e) => handleFilterChange(e.target.value, 'jail_name')}
                    label="Filter"
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(items.map((item) => item.jail_name))).map((jailName) => (
                      <MenuItem key={jailName} value={jailName}>
                        {jailName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight="bold" gutterBottom>
                  Status
                </Typography>
                <FormControl size="small" fullWidth>
                  <InputLabel>Filter</InputLabel>
                  <Select
                    value={filters.status}
                    onChange={(e) => handleFilterChange(e.target.value, 'status')}
                    label="Filter"
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(items.map((item) => item.status))).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.ip}</TableCell>
              <TableCell>{item.jail_name}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ItemList;
