import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RankPage.css'; // Import the CSS file

const RankPage = () => {
  const [ranks, setRanks] = useState({});
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get('https://sgt-back-uoua.vercel.app/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(userResponse.data.name);

        // Fetch ranks for each term
        const terms = [1, 2, 3, 4, 5, 6];
        const rankData = {};

        for (const term of terms) {
          const ranksResponse = await axios.get(`/api/ranks?term=${term}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          rankData[term] = ranksResponse.data;
        }

        setRanks(rankData);
      } catch (err) {
        setError('Failed to fetch ranks. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="rank-page-container">
      <h1 className="rank-page-header">User Ranks</h1>
      {error && <p className="error-message">{error}</p>}
      {Object.keys(ranks).map(term => (
        <div key={term}>
          <h2 style={{ textAlign: 'center', color: 'black' }}>Term {term}</h2>
          <table className="rank-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Total Grade</th>
              </tr>
            </thead>
            <tbody>
              {ranks[term] && ranks[term].map((rank, index) => (
                <tr key={index} className={rank.name === userName ? 'highlighted-row' : ''}>
                  <td>{rank.rank}</td>
                  <td>{rank.name}</td>
                  <td>{rank.totalGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RankPage;
