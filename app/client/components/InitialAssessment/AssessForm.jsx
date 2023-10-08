import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { NextFormButton } from '../navigation/Buttons';

const AssessForm = ({ child, onSubmit, initWords }) => {
  const validationSchema = Yup.object({
    words: Yup.array().min(1, 'Select at least one word'),
  });

  const [groupedWords, setGroupedWords] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Group words by category when initWords change
    const grouped = {};
    initWords.forEach((word) => {
      if (!grouped[word.category]) {
        grouped[word.category] = [];
      }
      grouped[word.category].push(word);
    });
    setGroupedWords(grouped);

    // Set the selected category to the first category when initWords change
    const categories = Object.keys(grouped);
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [initWords]);

  return (
    <View className=' flex flex-nowrap flex-col  justify-center items-stretch mt-5 mx-auto  w-9/12 shadow-lg rounded-lg border border-white bg-beigeTrans'>
      <View className='flex flex-[1_0_auto] m-0 border-b border-slate-200'>
        <View className='flex px-10 pt-10 pb-5'>
          <Text className='flex rgb(95 114 166) text-3xl font-black  text-primary-dark w-8/12 font-["Oleo Script"]'>
            {child.firstName} can say...
          </Text>
        </View>
      </View>

      <View className='flex px-10 pb-10 pt-4'>
        <Formik
          initialValues={{ initWords: {} }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form>
              <View className='flex flex-row pb-4'>
                <View className='flex-1 min-w-min mt-4'>
                  {/* Map over categories for tabs */}
                  {Object.keys(groupedWords).map((category) => (
                    <Pressable
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                      style={({ pressed }) => [
                        styles.tabItem,
                        selectedCategory === category && styles.selectedTabItem,
                        pressed && { backgroundColor: 'transparent' },
                      ]}
                    >
                      {({ pressed }) => (
                        <Text style={styles.tabText}>{category}</Text>
                      )}
                    </Pressable>
                  ))}
                </View>

                <View style={styles.contentContainer} className='ml-10 mt-2'>
                  {/* Display words for the selected category */}
                  <View style={styles.wordContainer}>
                    {selectedCategory && (
                      <View style={styles.wordColumns}>
                        {groupedWords[selectedCategory].map((initWord) => (
                          <View key={initWord._id} style={styles.wordColumn}>
                            <Text>
                              <Field
                                type='checkbox'
                                name='words'
                                value={initWord.id}
                              />
                              {initWord.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View className='flex justify-end flex-row'>
                <NextFormButton onPress={handleSubmit} />
                <button type='submit'> Next</button>
              </View>
            </Form>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default AssessForm;

const styles = StyleSheet.create({
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center',
  },

  container: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },

  contentContainer: {
    flex: 3,
    backgroundColor: 'transparent',
  },
  tabItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    backgroundColor: 'transparent',
    borderRight: 'none',
    paddingLeft: '20px',
    marginBottom: '16px',
    minWidth: '175px',
  },

  selectedTabItem: {
    backgroundColor: '#b6e08c8c',
    borderRadius: '18px',
    border: '1px solid #b6e08c',
  },
  tabText: {
    fontWeight: 'bold',
  },
  wordContainer: {
    padding: 10,
  },
  wordColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // You can adjust this to control the spacing between columns
  },
  wordColumn: {
    flexBasis: '32%', // Adjust the percentage to control the number of columns (e.g., '48%' for two columns)
    padding: 5,
  },
});
