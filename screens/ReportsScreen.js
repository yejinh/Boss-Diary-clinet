import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, StyleSheet } from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import EmptyScreen from '../components/EmptyScreen';
import Colors from '../constants/Colors';

export default function NewReportInputScreen(props) {
  const [ pageNumber, setPageNumber ] = useState(1);
  const [ isFetched, setIsFetched ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const { navigation } = props;
  const { profilePhoto, userReports, fetchUserReports } = props.screenProps;

  const didFocus = navigation.addListener('didFocus', async() => {
    await fetchUserReports(pageNumber);
    setIsFetched(true);
  });

  const _loadMoreReports = async() => {
    try {
      setIsLoading(true);

      await fetchUserReports(pageNumber);

      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const _refresh = () => {
    setPageNumber(1);
    _loadMoreReports();
  };

  useEffect(() => {
    return () => didFocus.remove();
  });

  if (!userReports.length && !isFetched) return <LoadingSpinner />;
  if (!userReports.length) return <EmptyScreen message={'작성한 보고서가 없습니다'}/>;

  // 여기서 나의 레포트들 보여주고 선택 시 사진첩 공유 가능하도록.
  // CameraRoll.saveToCameraRoll(url, 'photo');

  console.log(userReports);
  return (
    <SafeAreaView>
      <FlatList
        data={userReports}
        keyExtractor={item => item._id}
        refreshing={isLoading}
        onRefresh={_refresh}
        onEndReachedThreshold={0.05}
        onEndReached={() => {
          setPageNumber(pageNumber + 1);
          _loadMoreReports();
        }}
        renderItem={({ item }) => (
          <Report
            key={item}
            profilePhoto={profilePhoto}
            report={item}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
  },
  cardContainer: {
    flex: 1,
    flexWrap: 'wrap'
  },
  fabContainer: {
    flex: 1
  },
  mainFab: {
    backgroundColor: Colors.gray
  },
  fab: {
    backgroundColor: Colors.deepGreen
  },
  text: {
    fontSize: 12
  }
});
