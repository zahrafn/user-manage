'use client';

import { exportAllUsers } from '@/services/user/userServices';
import { apiClient } from '@/services/api/apiClient';
import { IUser } from '@/services/user/types';
import { exportToExcel } from '../utils/exportUtils';


export interface ExcelUser {
  Name: string;
  Gender: string;
  Nationality: string;
  Email: string;
  ID: string;
}

const transformUserToExcelFormat = (user: IUser): ExcelUser => ({
  Name: `${user.name.first} ${user.name.last}`,
  Gender: user.gender,
  Nationality: user.nat,
  Email: user.email,
  ID: user.login.uuid,
});

export const useUserExcelExport = () => {
  const handleDownloadFromApi = async () => {
    const response = await exportAllUsers(apiClient);
    const mappedData = response.results.map(transformUserToExcelFormat);
    exportToExcel(mappedData, 'AllUsersFromApi');
  };

  const handleDownloadCurrentPage = (users: IUser[]) => {
    const mappedData = users.map(transformUserToExcelFormat);
    exportToExcel(mappedData, 'CurrentPageUsers');
  };

  return {
    handleDownloadFromApi,
    handleDownloadCurrentPage,
  };
};