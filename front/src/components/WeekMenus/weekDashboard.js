// WeekIntakeDashboard.js
import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const WeekIntakeDashboard = ({ rows, menus, joursSemaine }) => {
  const isDataAvailable = rows && menus && joursSemaine;

  const dailyIntakes = useMemo(() => {
    if (!isDataAvailable) return [];
    return joursSemaine.map((jour, dayIndex) => {
      let totalIntakes = {};
      ['matin', 'midi', 'soir'].forEach((phase) => {
        const menuName = rows[phase]?.[dayIndex];
        if (menuName && menus[menuName]) {
          const menuIntakes = menus[menuName].intakes;
          if (menuIntakes) {
            for (const nutrient in menuIntakes) {
              const nutrientValue = parseFloat(menuIntakes[nutrient]);
              if (!isNaN(nutrientValue)) {
                totalIntakes[nutrient] =
                  (totalIntakes[nutrient] || 0) + nutrientValue;
              }
            }
          }
        }
      });
      return {
        day: jour.charAt(0).toUpperCase() + jour.slice(1),
        ...totalIntakes,
      };
    });
  }, [isDataAvailable, rows, menus, joursSemaine]);

  const nutrientKeys = useMemo(() => {
    const keysSet = new Set();
    dailyIntakes.forEach((dayIntake) => {
      if (dayIntake) {
        Object.keys(dayIntake).forEach((key) => {
          if (key !== 'day') {
            keysSet.add(key);
          }
        });
      }
    });
    return Array.from(keysSet);
  }, [dailyIntakes]);

  const theme = useTheme();
  // Assurer que les couleurs du graphique sont définies
  const chartColors = theme.palette.chartColors || [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#d0ed57',
    '#a4de6c',
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Apports nutritionnels hebdomadaires
      </Typography>
      {dailyIntakes.length > 0 && nutrientKeys.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dailyIntakes}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {nutrientKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index % chartColors.length]}
                name={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          Pas de données disponibles pour afficher le graphique.
        </Typography>
      )}
    </Box>
  );
};

export default WeekIntakeDashboard;
