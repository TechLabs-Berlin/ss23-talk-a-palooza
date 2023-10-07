import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';

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
    <>
      <View>
        <Formik
          initialValues={{ initWords: {} }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <View style={styles.app}>
              <View className='container flex flex-col items-center justify-center mt-16 mx-auto sm:py-24 w-6/12 shadow-lg border px-5 py-10 rounded-[5px] border-solid border-gray-200 bg-lightgrey bg-opacity-80'>
                <Text className="text-primary-dark text-2xl sm:text-1xl  text-center font-black leading-7 md:leading-10 font-['Oleo Script']">
                  {child.firstName} can say...
                </Text>
                <View style={styles.container}>
                  <View style={styles.tabContainer}>
                    {/* Map over categories for tabs */}
                    {Object.keys(groupedWords).map((category) => (
                      <Pressable
                        key={category}
                        onPress={() => setSelectedCategory(category)}
                        style={({ pressed }) => [
                          styles.tabItem,
                          selectedCategory === category &&
                            styles.selectedTabItem,
                          pressed && { backgroundColor: '#ddd' },
                        ]}
                      >
                        {({ pressed }) => (
                          <Text style={styles.tabText}>{category}</Text>
                        )}
                      </Pressable>
                    ))}
                  </View>
                  <View style={styles.contentContainer}>
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

                <View style={(styles.flex, styles.end)}>
                  <button type='submit'> Next</button>
                </View>
              </View>
            </View>
          </Form>
        </Formik>
      </View>
    </>
  );
};

export default AssessForm;

const styles = StyleSheet.create({
  bloc: {
    flexDirection: 'row',
    // maxWidth: '250px',
    flexWrap: 'wrap',
    margin: '20px',
  },
  end: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '1em',
    textAlign: 'center',
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center',
  },
  link: {
    color: '#1977f2',
  },
  listitem: {
    marginVertical: '0.5rem',
  },
  pageLink: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flex: 3,
    backgroundColor: '#fff',
  },
  tabItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedTabItem: {
    backgroundColor: '#e0e0e0',
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
