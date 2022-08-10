#include <vector>
#include <iostream>

using namespace std;

vector<string> splitString(string str);

vector<string> getWordsFromString(string str);

template <size_t N> 
bool searchArrayChar(char (&arr)[N], char target);

string getSubVector(vector<string> arr, int start, int end = -1);

void checkForKeyword(string str);