import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const App = () => {
  const [glasses, setGlasses] = useState(0);
  const [animValue] = useState(new Animated.Value(0));

  const increment = () => {
    setGlasses(prev => prev + 1);
    Animated.timing(animValue, {
      toValue: glasses + 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const decrement = () => {
    if (glasses > 0) {
      setGlasses(prev => prev - 1);
      Animated.timing(animValue, {
        toValue: glasses - 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const progress = Math.min(glasses / 8, 1);

  const animatedProgress = animValue.interpolate({
    inputRange: [0, 8],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.header, { backgroundColor: `rgba(0,0,0,${progress})` }]}>
        <Text style={styles.title}>Water Tracker</Text>
      </Animated.View>

      <View style={styles.content}>
        <Text style={styles.label}>Glasses</Text>
        <Animated.Text style={styles.value}>{glasses}</Animated.Text>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={decrement} disabled={glasses === 0}>
            <Text style={styles.button}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={increment}>
            <Text style={styles.button}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progress}>
          <Animated.View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>

        <Text style={styles.footer}>Goal: 8 glasses</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 8,
  },
  value: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#444',
    marginTop: 30,
  },
  footer: {
    alignSelf: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 10,
  },
});
export default App;