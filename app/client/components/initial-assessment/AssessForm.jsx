import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { NextFormButton } from '../layouts/Buttons';
import { Heading } from '../layouts/typo';

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

  // Function to format category names
  const formatCategoryName = (rawCategoryName) => {
    // Split the raw category name by underscores
    const words = rawCategoryName.split('_');

    // Capitalize each word and join them with spaces
    const formattedCategoryName =
      words[0].charAt(0).toUpperCase() +
      words[0].slice(1).toLowerCase() +
      words
        .slice(1)
        .map((word) => ' ' + word.toLowerCase())
        .join(' '); // Capitalize only the first letter

    return formattedCategoryName;
  };

  return (
    <View className='flex flex-col items-stretch justify-center w-10/12 mx-auto my-auto border border-white rounded-lg shadow-lg flex-nowrap bg-beigeTrans'>
      <View className='flex flex-[1_0_auto] m-0 border-b border-slate-200'>
        <View className='flex px-10 pt-10 pb-5'>
          <Heading
            text={`${child.firstName} can say...`}
            style={{ fontSize: '1.875rem' }}
          />
        </View>
      </View>

      <View className='flex px-10 pt-2 pb-10'>
        <Formik
          initialValues={{ initWords: {} }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form>
              <View className='flex flex-row'>
                <View className='mt-4 min-w-min'>
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
                        <Text style={styles.tabText}>
                          {formatCategoryName(category)}
                        </Text>
                      )}
                    </Pressable>
                  ))}
                </View>

                <View style={styles.contentContainer} className='mt-2 ml-5'>
                  {/* Display words for the selected category */}
                  <View style={styles.wordContainer}>
                    {selectedCategory && (
                      <View style={styles.wordColumns}>
                        {groupedWords[selectedCategory].map((initWord) => (
                          <View
                            key={initWord._id}
                            className='flex flex-row items-center pl-2 pr-6 mr-3 duration-150 bg-white border rounded-full shadow-sm cursor-pointer backdrop-blur-sm border-slate-300'
                            style={styles.wordColumn}
                          >
                            <Field
                              type='checkbox'
                              name='words'
                              value={initWord.id}
                            />
                            <Text className='ml-1 text-primary-dark'>
                              {initWord.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View className='flex flex-row justify-end'>
                <NextFormButton onPress={handleSubmit} />
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
    borderRightColor: 'transparent',
    paddingLeft: '20px',
    marginBottom: '8px',
    minWidth: '175px',
  },

  selectedTabItem: {
    backgroundColor: '#b6e08c8c',
    borderRadius: '18px',
    border: '1px solid #b6e08c',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#13334c',
    fontSize: '14px',
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
    flexBasis: '30%', // Adjust the percentage to control the number of columns (e.g., '48%' for two columns)
    padding: 5,
    marginBottom: 10,
  },
});
