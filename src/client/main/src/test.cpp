#include<cstdlib>
#include<cstring>
#include<cmath>
#include<cstdio>

using namespace std;

int main() {
	freopen("test.txt","w",stdout);
	int i;
	for(i = 1;i <= 41;i++) {
		printf("import craftAddr%d from \"../models/model/%d/%d.json\";craftAddr.push(craftAddr%d);\n",i - 1,i,i,i - 1);
	}
	fclose(stdout);
}
