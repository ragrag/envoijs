#include <iostream>
using namespace std;

bool checkUnique(string s)
{
    bool mp[256]{false};
    for (auto c : s)
    {
        if (mp[c])
        {
            return false;
        }
        mp[c] = true;
    }
    return true;
}

int main()
{
    string s = "abc";
    cin >> s;
    checkUnique(s) ? cout << "True\n" : cout << "False\n";
    return 0;
}
