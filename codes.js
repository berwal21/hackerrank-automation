module.exports = {
    answers:[
        `#include <bits/stdc++.h>
        using namespace std;
        
        int main(){
        int number_of_elements;
        cin>>number_of_elements;
        vector<int> array(number_of_elements);
        int sum =0;
        for(int i=0; i<number_of_elements; i++)
        {
           cin >> array[i];
           sum += array[i];
        }
           cout << sum;
           return 0;
        
        }`
    ]
}