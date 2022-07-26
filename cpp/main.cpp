#include <iostream>
#include <fstream> //read file
#include <sstream>
#include <vector>

#include "method.h"

using namespace std;

template <size_t N>
bool searchArrayChar(char (&arr)[N], char target) {
  for (char item : arr) {
    if (item == target) {
      return true;
    }
  }
  return false;
}

class Variable {
  private:

    string name;
    string value;
    string type = "str";

  public:

    Variable(string n, string v) {
      name = n;
      value = v;
    }

    Variable() {
      name = "";
      value = "";
    }

    string getName() {
      return name;
    }

    string getType() {
      return type;
    }

    void setType(string n) {
      type = n;
    }

    string getValue() {
      return value;
    }

    void toString() {
      cout << "name: " << name << " value: " << value << endl;
    }

    bool checkNum() {
      char digits[10] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
      int numDot = 0;

      for (char i : value) {
        if (i == '.') {
          numDot++;
          continue;
        }
        if (!searchArrayChar(digits, i)) {
          return false;
        }
      }

      if (numDot > 1) {
        return false;
      }
      return true;
    }
};

class Token {
  private:
    string type;

    //for declarations and expressions
    string varName;
    string varValue;

    //for statements
    //if
    int lines;
    //for
    int repetitions;

    vector<Token*> children;
    
  public:
    Token(string t, string vN, string vV) {
      type = t;
      varName = vN;
      varValue = vV;
    }

    //if statement
    Token(string t, int l) {
      type = t;
      lines = l;
    }

    //output
    Token(string t, string vV) {
      type = t;
      varValue = vV;
    }

    //for statement
    Token(string t, int r, int l) {
      type = t;
      repetitions = r;
      lines = l;
    }

    void setType(string t) {
      type = t;
    }

    void setChildren(vector<Token*> c) {
      children = c;
    }

    void setVarInfo(string n, string v) {
      varName = n;
      varValue = v;
    }

    string getType() {
      return type;
    }

    string getVarName() {
      return varName;
    }

    string getVarValue() {
      return varValue;
    }
};

vector<Variable> memory;
vector<Token> tokens;

void lex(vector<string> code) {
  for (string line : code) {

    //if line is blank
    if (line == "") continue;

    vector<string> words = getWordsFromString(line);
    
    //variable declaration --> var nick = "nick"
    if (words.at(0) == "var") {
      checkForKeyword(words.at(1));
      Token newTok("declaration", words.at(1), words.at(3));
      tokens.push_back(newTok);
    }

    //variable expression --> nick = "nick"
    else if (words.at(1) == "=") {
      Token newTok("expression", words.at(0), getSubVector(words, 2));
      tokens.push_back(newTok);
    }

    //print
    else if (words.at(0) == "print") {
      Token newTok("output", getSubVector(words, 1));
      tokens.push_back(newTok);
    }

    //if statement
    else if (words.at(0) == "if") {
      Token newTok("if", stoi(words.at(1)));
      tokens.push_back(newTok);
    }

    //for loop
    else if (words.at(0) == "for") {
      Token newTok("for", stoi(words.at(1)), stoi(words.at(3)));
      tokens.push_back(newTok);
    }
  }
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

  lex(code);

  cout << tokens.at(3).getType() << endl;

  return 0;
}