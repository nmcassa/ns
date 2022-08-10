#include "method.h"

using namespace std;

void checkForKeyword(string str) {
  string keywords[4] = {"var", "for", "if", "print"};

  for (string key : keywords) {
    if (str == key) {
      throw std::invalid_argument( "a variable cannot be a keyword" );
    }
  }
}

vector<string> splitString(string str) {
  stringstream ss(str);
  string to;
  vector<string> code;

  while (getline(ss, to, '\n')) {
    code.push_back(to);
  }

  return code;
}

vector<string> getWordsFromString(string str) {
  string word = "";
  vector<string> ret;

  for (char letter : str) {
    if (letter == ' ') {
      ret.push_back(word);
      word = "";
    } else {
      word = word + letter;
    }
  }
  ret.push_back(word);

  return ret;
}

void vectorToString(vector<string> code) {
  for (string item : code) {
    cout << item << endl;
  }
}

string getSubVector(vector<string> arr, int start, int end) {
  string ret = "";

  if (end == -1) {
    end = arr.size();
  }

  for (; start < end; start++) {
    ret = ret + arr.at(start);
  }

  return ret;
}