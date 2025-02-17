/** @format */

import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useUserStore, UserData } from "../../store/useUserStore";

type VisibleListKey = keyof UserData["preferences"]["visibleCourseLists"];

const listOptions: Array<{
  key: VisibleListKey;
  label: string;
  navHeader: string;
}> = [
  { key: "isStudent", label: "Current Courses", navHeader: "Current courses" },
  {
    key: "isStudentOld",
    label: "Completed Courses",
    navHeader: "Past courses",
  },
  { key: "isTeacher", label: "Teaching Courses", navHeader: "Teaching" },
  {
    key: "isTeacherOld",
    label: "Past Teaching",
    navHeader: "Teaching history",
  },
  {
    key: "available",
    label: "Available Courses",
    navHeader: "Available courses",
  },
];

export const CourseListVisibilityMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, updateUser } = useUserStore();
  const visibleLists = user?.preferences.visibleCourseLists;
  const visibleNavigation = user?.preferences.visibleNavigation;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (key: VisibleListKey, navHeader: string) => {
    console.log("Toggling visibility for", key, navHeader);
    console.log("visibleLists", visibleLists);
    console.log("visibleNavigation", visibleNavigation);
    if (!user || !visibleLists || !visibleNavigation) return;

    const updatedUser: UserData = {
      ...user,
      preferences: {
        ...user.preferences,
        visibleCourseLists: {
          ...visibleLists,
          [key]: !visibleLists[key],
        },
      },
    };

    updateUser(updatedUser);
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <FilterListIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {listOptions.map(({ key, label, navHeader }) => (
          <MenuItem
            key={key}
            onClick={() => handleToggle(key, navHeader)}
            dense
          >
            <Checkbox checked={visibleLists?.[key]} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
