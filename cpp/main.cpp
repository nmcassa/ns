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

  cout << code.at(4) << endl << code.at(5) << endl;

  return 0;
}