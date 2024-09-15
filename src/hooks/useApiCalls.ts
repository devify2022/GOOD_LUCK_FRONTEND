import {useState} from 'react';
import {addNewDealer, getAllDealers, getInvoice} from '../services';
import {AxiosResponse} from 'axios';
import {Alert} from 'react-native';
export interface IAddDealer {
  fullname: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleId: string;
}
export interface User {
  userId: string;
  fullname: string;
  email: string;
  roleId: string;
  phoneNumber: string;
}

const useApiservices = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const [dealerAdded, setdealerAdded] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const fetchUserList = async (roleid: string) => {
    setloading(true);
    try {
      //(roleid);
      const response = await getAllDealers({roleid});
      //(response?.data?.data);
      setUserList(response?.data?.data);
      //(userList);
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };

  const addDealer = async (payload: IAddDealer) => {
    //(payload);
    setloading(true);
    try {
      const response: AxiosResponse = await addNewDealer(payload);
      //(response?.data?.data);
      if (response?.data?.data) {
        Alert.alert('Dealer added successfully');
        setloading(false);
        setdealerAdded(true);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Something went wrong');
      setloading(false);
    }
  };

  const getInvoiceFile = async (payload: {html: string}) => {
    try {
      setloading(true);
      const response: AxiosResponse = await getInvoice(payload);
      setloading(false);
      // console.log(response.request._response);

      return response.request._response ?? '';
    } catch (error) {
      setloading(false);
      console.error(error);
      Alert.alert('Something went wrong');
    }
  };

  return {
    userList,
    loading,
    fetchUserList,
    addDealer,
    dealerAdded,
    setdealerAdded,
    getInvoiceFile,
  };
};

export default useApiservices;
