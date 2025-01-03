import { Divider, Stack } from "@mui/material";
import { Account, AccountPopoverFooter, AccountPreview, SignOutButton } from "@toolpad/core";
import DevelopmentTools from "../DevelopmentTools";

export const ToolbarAccount = () => {
    return (
      <Account
        slots={{
          popoverContent: AccountMenu,
        }}
      />
    );
  };
  
  const AccountMenu = () => {
    return (
      <Stack direction='column'>
        <AccountPreview variant='expanded' />
        <Divider />
        <DevelopmentTools />
        <Divider />
        <AccountPopoverFooter>
          <SignOutButton />
        </AccountPopoverFooter>
      </Stack>
    );
  };
  