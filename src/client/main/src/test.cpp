#include<cstdlib>
#include<cstring>
#include<cmath>
#include<cstdio>

using namespace std;

int x[5][20];
int y[5][20];
int z[5][20];
int model[5][20];
int num[5];

int main() {
	freopen("clue.txt","r",stdin); 
	freopen("test3.txt","w",stdout);
	char name[100];
	char hint[100];
	int id;
	for(int i = 0;i <= 40;++i) {
		scanf("%s%d%s",name,&id,hint);
	//	printf("name is %s id is %d hint is %s\n",name,id,hint);
		printf("craftName[%d] = \"%s\";hints[%d] = \"%s\";",i,name,i,hint);
		if(i % 2 == 0) printf("\n"); 
	}
	fclose(stdin);
	fclose(stdout);
	/*
	freopen("item.txt","r",stdin);
	freopen("test2.txt","w",stdout);
	int i,k,q;
	num[0] = num[1] = num[2] = num[3] = 0;
	for(i = 1;i <= 40;i++) {
		int j;
		scanf("%d",&j);
	//	printf("%d\n",j);
		--j;
		scanf("%d%d%d%d",&model[j][num[j]],&x[j][num[j]],&z[j][num[j]],&y[j][num[j]]);
		++num[j];
	}
	for(i = 0;i < 4;i++){
		printf("roomModelX[%d] = [];roomModelY[%d] = [];roomModelZ[%d] = [];roomModelType[%d] = [];roomModelNum[%d] = %d;\n",i,i,i,i,i,num[i]);
		for(k = 0;k < num[i];k++) {
			printf("roomModelX[%d].push(%d);roomModelY[%d].push(%d);roomModelZ[%d].push(%d);roomModelType[%d].push(%d);\n",i,x[i][k],i,y[i][k],i,z[i][k],i,model[i][k] - 1);
			
		}
	}
	fclose(stdout);
	fclose(stdin);*/
	/*freopen("test.txt","w",stdout);
	int i;
	for(i = 1;i <= 41;i++) {
		printf("import craftAddr%d from \"../models/model/%d/%d.png\";craftAddr.push(craftAddr%d);\n",i - 1,i,i,i - 1);
	}
	fclose(stdout);*/
}

