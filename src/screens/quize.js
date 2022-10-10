import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getQuestions} from '../store/actions/postActions';

export const Quiz = ({navigation}) => {
  const {questions} = useSelector(state => state.questions);
  // console.log(questions)
  const dispatch = useDispatch();
  const [ques, setQues] = useState(0);
  const [curantAnswer, setCurantAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const flatListRef = useRef(null);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleNextPress = () => {
    const iscorrect = questions[ques].correctAnswer === curantAnswer;
    if (iscorrect) {
      setScore(prev => prev + 1);
    }
    setCurantAnswer(null);

    if (ques + 1 >= questions?.length) {
      setQues(0);
      setFinish(true);
    } else {
      setQues(prev => prev + 1);
    }
    console.log(iscorrect);
  };

  // console.log(handleNextPress);
  const renderItem = ({item}) => {
    const arrayCorrect = [item.correctAnswer, ...item.incorrectAnswers];
    const shuffleRandomArray = shuffleArray(arrayCorrect);
    // console.log(shuffleRandomArray);

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.question}>Q. {item.question} </Text>
        </View>
        <View style={styles.options}>
          {shuffleRandomArray.map((answer, index) => (
            <TouchableOpacity
              key={answer + index}
              style={styles.optionButtom}
              onPress={() => setCurantAnswer(answer)}>
              <Text style={styles.option}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    flatListRef?.current?.scrollToOffset({
      offset: ques * Dimensions.get('window').width,
      animated: true,
    });
  }, [ques]);

  return (
    <View>
      {!finish && (
        <>
          <FlatList
            data={questions}
            extraData={questions}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            horizontal
            ref={flatListRef}
            removeClippedSubviews={true}
          />
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>
            {true && (
              <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
      {finish && (
        <>
          <Image
            style={styles.banner}
            source={require('../../assets/fonts/QuizFonts.png')}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={(handleNextPress, () => navigation.navigate('Home'))}>
            <Text style={styles.buttonText}> RESULT:{score}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    width: Dimensions.get('window').width,
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
  },
  bottom: {
    marginBottom: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A759F',
    marginHorizontal: 20,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
  },
  optionButtom: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  banner: {
    height: 300,
    width: 300,
  },
});
