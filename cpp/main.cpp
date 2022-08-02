#include <iostream>
#include <fstream> //read file
#include <stdexcept> //errors
#include <sstream>
#include <vector>
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

void vectorToString(vector<string> code) {
  for (string item : code) {
    cout << item << endl;
  }
}

template <size_t N>
bool searchArrayChar(char (&arr)[N], char target) {
  for (char item : arr) {
    if (item == target) {
      return true;
    }
  }
  return false;
}

//use later for int and string differences
bool checkNum(string str) {
  char digits[10] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
  for (char i : str) {
    if (!searchArrayChar(digits, i)) {
      return false;
    }
  }
  return true;
}

class Variable {
  private:
    string name;
    string value;
  public:
    Variable(string n, string v) {
      name = n;
      value = v;
    }
    string getName() {
      return name;
    }
    string getValue() {
      return value;
    }
    void toString() {
      cout << "name: " << name << " value: " << value << endl;
    }
};

vector<Variable> memory;

vector<string> lex(vector<string> code) {
  for (string line : code) {
    vector<string> words = getWordsFromString(line);
    
    if (words.at(0) == "var") {
      Variable new_var(words.at(1), words.at(3));
      memory.push_back(new_var);
    }
  }

  return code;
}

int main() {
  string myText;
  string total;

  ifstream MyReadFile("../hello.nick");

  // Use a while loop together with the getline() function to read the file line by line
  while (getline (MyReadFile, myText)) {
    total = total + myText + "\n";
  }

  MyReadFile.close();

  vector<string> code = splitString(total);

  code = lex(code);

  memory.at(0).toString();

  return 0;
}