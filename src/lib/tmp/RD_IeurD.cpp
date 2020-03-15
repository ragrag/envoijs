#include <iostream>
using namespace std;
#include <vector>
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
while(true)
{
    int x=0;
}
int n,a,b;
cin>>n;
int sums = 0;
for(int i=0;i<n;i++)
{
  int x;
  cin>>x;
  sums+=x;
}
cout<<sums<<endl;
    //checkUnique(s) ? cout << "True\n" : cout << "False\n";
    return 0;
}
