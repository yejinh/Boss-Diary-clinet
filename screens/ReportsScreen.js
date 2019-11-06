import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  View,
  Fab,
  Button,
  Icon,
  Text
} from 'native-base';
import Colors from '../constants/Colors';

export default function NewReportInputScreen(props) {
  const [ isActive,  setIsActive ] = useState(false);
  // 여기서 나의 레포트들 보여주고 선택 시 사진첩 공유 가능하도록.
  // CameraRoll.saveToCameraRoll(url, 'photo');
  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Fab
          active={isActive}
          direction='left'
          style={styles.mainFab}
          position='bottomRight'
          onPress={() => setIsActive(!isActive)}
        >
          <Icon name='ios-hammer' />
          <Button style={styles.fab} onPress={() => alert("This is Card Header")}>
            <Text style={styles.text}>굴림</Text>
          </Button>
          <Button style={styles.fab}>
            <Text style={styles.text}>궁서</Text>
          </Button>
          <Button disabled style={styles.fab}>
            <Text style={styles.text}>명조</Text>
          </Button>
        </Fab>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
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
