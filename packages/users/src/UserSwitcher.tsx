/** @format */

import { MenuItem, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import { type UserData, useUserStore } from './store/useUserStore';

const UserSwitcher: React.FC = () => {
  const { user, setUser, testUsers, setTestUsers } = useUserStore();

  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const switchUser = (newUser: UserData) => {
    //First filter out the new user
    const oldUsers = testUsers.filter((u) => u.id !== newUser.id);
    //Add the old user back to the list

    setTestUsers([...oldUsers, user as UserData]);
    setUser(newUser);
  };

  return (
    <>
      {testUsers.map((account) => (
        <MenuItem
          key={account.id}
          component='button'
          onClick={() => switchUser(account)}
          sx={{
            justifyContent: 'flex-start',
            width: '100%',
            columnGap: 2,
          }}>
          <ListItemIcon>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.95rem',
              }}
              src={account.image?.thumbnail || account.image?.large}
              alt={account?.name ?? ''}>
              {account.name[0]}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
            }}
            primary={account.name}
            secondary={account.email}
            primaryTypographyProps={{ variant: 'body2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </MenuItem>
      ))}
    </>
  );
};

export default UserSwitcher;
