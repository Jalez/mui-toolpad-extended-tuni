/** @format */

import { Stack } from '@mui/material';
import { CollapsibleMenu } from './CollapsibleMenu';
import SearchBar from './SearchBar';

export function CustomActions() {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      flexWrap='nowrap'
      sx={{ width: '100%' }}>
      <SearchBar />
      {/* Put CollapsibleMenu on the right side */}
      <Stack direction='row' alignItems='center' spacing={2}>
        <CollapsibleMenu />
      </Stack>
    </Stack>
  );
}
