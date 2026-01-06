# Troubleshooting Guide

## Problems Not Showing

If problems are not showing up in the frontend, check the following:

### 1. Backend Server Status
Make sure the backend server is running:
```powershell
cd backend
npm start
```

The server should show:
```
MongoDB connected
Server running on port 5000
```

### 2. Database Seeding
Make sure MongoDB is running and the database is seeded:
```powershell
cd backend
node scripts/seedProblems.js
```

You should see:
```
Connected to MongoDB
Cleared existing problems
Seeded 10 problems
```

### 3. MongoDB Connection
Ensure MongoDB is running:
- **Windows**: Check if MongoDB service is running
- **macOS**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

### 4. Check Browser Console
Open browser DevTools (F12) and check:
- Network tab: Look for failed requests to `http://localhost:5000/api/problems`
- Console tab: Check for any error messages

### 5. CORS Issues
If you see CORS errors, make sure:
- Backend is running on port 5000
- Frontend is making requests to `http://localhost:5000`
- CORS is enabled in `backend/server.js`

### 6. Common Issues

**Issue**: "Cannot connect to backend server"
- **Solution**: Start the backend server with `cd backend && npm start`

**Issue**: "No problems found"
- **Solution**: Seed the database with `cd backend && node scripts/seedProblems.js`

**Issue**: Empty table with no message
- **Solution**: Refresh the page after seeding the database

### Quick Fix Checklist
- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Database is seeded (10 problems)
- [ ] Frontend is running on port 3000
- [ ] No errors in browser console
- [ ] No errors in backend terminal



