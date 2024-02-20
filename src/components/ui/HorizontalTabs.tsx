import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Badge, BadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: -5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

type Props = {
  tabItems: { label: string; component: React.ReactNode; errorCount: number }[];
};

export const HorizontalTabs: FC<Props> = (props) => {
  const { tabItems } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        {tabItems.map((item, index) => {
          return (
            // <Tab key={index} label={item.label} {...a11yProps(index)} />
            <Tab
              key={index}
              label={
                <StyledBadge badgeContent={item.errorCount} color="error">
                  {item.label}
                </StyledBadge>
              }
              {...a11yProps(index)}
            />
            // <StyledBadge badgeContent={item.errorCount} color="error">
            //   <Tab key={index} label={item.label} {...a11yProps(index)} />
            // </StyledBadge>
          );
        })}
      </Tabs>
      {tabItems.map((item, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <Box>{item.component}</Box>
          </TabPanel>
        );
      })}
    </Box>
  );
};
