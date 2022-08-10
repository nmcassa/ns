#include <iostream>
#include <sstream>
#include <vector>

#include "methods.hpp"

using namespace std;

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