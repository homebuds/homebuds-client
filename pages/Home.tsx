import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';
import { Chore, AssignedChore, Account } from '../types/backend';
import HorizontalList from '../components/HorizontalList';

const chores: Chore[] = [
  {
    id: "c1",
    choreDescription: "Take out the trash",
    choreName: "Trash Duty",
  },
  {
    id: "c2",
    choreDescription: "Wash the dishes",
    choreName: "Dishwashing",
  },
  {
    id: "c3",
    choreDescription: "Vacuum the living room",
    choreName: "Vacuum",
  },
  {
    id: "c4",
    choreDescription: "Clean the bathroom",
    choreName: "Bathroom Cleanup",
  },
];

const assignedChores: AssignedChore[] = [
  {
    id: "1",
    choreId: "c1",
    accountId: "a1",
    date: new Date("2023-09-16"),
    isCompleted: false,
  },
  {
    id: "2",
    choreId: "c2",
    accountId: "a1",
    date: new Date("2023-09-17"),
    isCompleted: true,
  },
  {
    id: "3",
    choreId: "c3",
    accountId: "a2",
    date: new Date("2023-09-16"),
    isCompleted: false,
  },
  {
    id: "4",
    choreId: "c4",
    accountId: "a2",
    date: new Date("2023-09-18"),
    isCompleted: false,
  },
  {
    id: "5",
    choreId: "c1",
    accountId: "a3",
    date: new Date("2023-09-19"),
    isCompleted: false,
  },
  {
    id: "6",
    choreId: "c3",
    accountId: "a4",
    date: new Date("2023-09-16"),
    isCompleted: true,
  },
  {
    id: "7",
    choreId: "c2",
    accountId: "a3",
    date: new Date("2023-09-20"),
    isCompleted: false,
  },
  {
    id: "8",
    choreId: "c3",
    accountId: "a4",
    date: new Date("2023-09-16"),
    isCompleted: true,
  },
  {
    id: "9",
    choreId: "c2",
    accountId: "a3",
    date: new Date("2023-09-20"),
    isCompleted: false,
  },
  {
    id: "10",
    choreId: "c3",
    accountId: "a4",
    date: new Date("2023-09-16"),
    isCompleted: true,
  },
  {
    id: "11",
    choreId: "c2",
    accountId: "a3",
    date: new Date("2023-09-20"),
    isCompleted: false,
  },
];

const accounts: Account[] = [
  {
    accountId: "a1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  {
    accountId: "a2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
  },
  {
    accountId: "a3",
    firstName: "Emily",
    lastName: "Smith",
    email: "emily.smith@example.com",
  },
  {
    accountId: "a4",
    firstName: "Tom",
    lastName: "Brown",
    email: "tom.brown@example.com",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 8,
    height: "100%",
    width: 180
  },
  listSubOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  redCircle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  greenCircle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: 'green',
  },
  flatListContainer: {
    maxHeight: "30%"
  }
});

interface IHome {
    user?: string;
}

const Home = ({user} : IHome) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<AssignedChore[]>([]);

  const getMovies = async () => {
    try {
      let tempChores = assignedChores.map(aChore => {
        const chore = chores.find(chore => aChore.choreId === chore.id)
        const account = accounts.find(account => account.accountId === aChore.accountId);
          return {
            ...aChore,
            choreDescription: chore?.choreDescription,
            choreName: chore?.choreName,
            firstName: account?.firstName,
            lastName: account?.lastName
          }
      });
      if (user) {
        tempChores = tempChores.filter(chore => chore.accountId === user)
      }
      setData(tempChores);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
        <View style={{flex: 1}}></View>
        <HorizontalList items={data} />
        </>
      )}
    </View>
  );
};

export default Home;