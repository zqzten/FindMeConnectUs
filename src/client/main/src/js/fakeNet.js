import * as THREE from "three";

export class FakeNet {
	constructor(gameId,playerId) //根据 游戏的id 和 本地玩家的id 建立通讯
	{
		this.gameId = gameId;
		this.playerId = playerId;
	}


	/*
	功能：获取该场游戏的所有玩家
	返回：Player类数组
	要求：
		返回的数组对于任意一个游戏内的玩家客户端，顺序是绝对的，
		即在第一个玩家返回的数组中，该玩家是第三位，
		那么在其他玩家返回的数组中，该玩家也是第三位。
	 */
	getGamePlayers() {
		return [null,null,null,null];
	}

	/*
	功能：获取房间的信息
	返回：地图的row，column，以及一个 row x column 数组，代表每一个位置的房间的模板编号
	 */
	getRoomInfo() {
		return [2,2,[[0,1],[0,2]]];
	}

	/*
	功能：本地玩家准备完毕，信息上传至后端
	返回：成功消息
	 */
	setPlayerReady() {
		return true;
	}

	/*
	功能：获取所有玩家准备消息
	返回：true 代表 所有玩家准备完毕，游戏可以开始
		  false 代表 存在玩家未准备完毕，游戏暂时不能开始
	 */
	allPlayersReady() {
		return true;
	}


	/*
	功能：将本地玩家的位置上传
	返回：成功消息
	注意：
		后端会向所有玩家推送该玩家(或直接推送所有玩家)位置改变的消息,
		本地会接受消息，将非本地玩家的位置改变

	 */

	setPlayerPosition(x,y,z) {
		return true;
	}
	getPlayersPosition() {
		return [[5,0,5],[1,0,3],[4,0,3],[10,0,2]];
	}

	
	/* ！！！暂时不用！！！
	因为一开始没有内奸模式（传说中的增量开发），所以所有玩家会同时获得线索
	功能：对于给定的 轮次id，以及 上次选择玩家的下标，获取选取获取线索的玩家下标
	 */
	getSelectedPlayer(turnId,lastSelectedPlayerIndex) {
		return 0;
	}


	/*
	功能：对于给定的可选择物件id 和 上次选择物件的id，获取这次线索的提示信息
	返回：字符串，代表线索
	注意：最好相邻两次物件不要相同，一个物件可以有多个线索，保存在后端，每次只要随机选一个即可
	 */
	getHint(craftsID) {
		return "曾是软件学院的学长，女装大佬";
	}



	/*
	功能：本地玩家对投票栏内第index(0开始)的物品投了一票
	返回：成功消息
	注意：会同时调用unvote清除当前玩家原来投的一票，这步由本地完成，
		  后台只要接受unvote和vote指令即可
		  但是后台需要记录每一个下标的投票栏中哪些玩家的id投了票，目的是为了当 改变投票物品时，要返还投票（下文）
	 */
	voteCraft(index) {
		return true;
	}
	unVoteCraft(index) {
		return true;
	}


	/*
	功能：本地玩家对改变了投票栏下标为第index的物件，物件的id是craftID
	返回：成功消息
	注意：理论上本地玩家只能对某一个下标（即与玩家编号相同）的投票栏进行改变，后台只要接受index即可
		  当该函数改变了物品之后，该物品的投票值被清0
		  此时
		  	后端会对曾经投了该下表投票栏票的玩家端推返还票数的请求，本地会接受事件，回调将可用票数+1
			后端会向所有玩家推送物品改变的请求，本地会接受事件，回调将该下标index的物件改为craftID所指示的物件
		  理论上存在一个 “空” 的物件，即没有投票物件，此时本地会阻止对“空物件”的投票
	*/
	changeVoteCraft(index,craftId) {
		return true;
	}
	returnPlayerVote() {
	}
	getChangedVoteCraft() {
		return [index,craftID];
	}

	/*
	功能：获取投票结果
	返回：长度和投票栏长度相同过的数组，代表每个投票栏内的票数
	注意：返回票数之后，本地自己处理控制输赢即可
	 */
	getVoteResult() {
		return [0,2,0,1,1,2];
	}

	/*！！！不需要！！！
	
	 */
	getMaxVotedCraft() {
		return 0;
	}

	/* 用于暂时不存在内奸模式，所以所有玩家的输赢是一致的
	功能：赢得了当前比赛，供记录用
	 */
	setWin() {
		return true;
	}
	
	/*
	功能：输掉了当前比赛，供及录用
	 */
	setLose() {
		return true;
	}


	/*
	功能：如果当前轮次失败，需要随机踢出一名玩家，获取被剔除的玩家下标(不是编号)
	返回：下标
	注意：后台需要记录一下玩家是否被剔除，不能重复剔除同一个玩家
		 */
	getOutPlayer() {
		return index;
	}
	/*
	功能：本地玩家被出局
	返回：成功消息
	注意：本地玩家会变成上帝视角，
		  后台会对所有玩家推送出局事件，本地会接受，回调通知某玩家出局
	 */
	setPlayerOut() {
		return true;
	}
	getPlayerOutInfo() {
		return [false,false,false,true];
	}

	/*
	功能：解锁了一扇门
	返回：成功消息
	注意：传入的是门的下标，这个下标在任意一个本地端的指代都是一样的
		  后台会对所有玩家推送解锁事件，本地会接受，让门消失
	 */
	unLockDoor(doorIndex) {
		return true;
	}
	getUnlockDoor(){
		return doorIndex;
	}

	/*
	功能：因为轮次失败而锁上了一扇门
	注意：这扇门必须之前是被解锁的，所有玩家必须收到相同的下标信息
	 */
	getLockDoor() {
		return doorIndex;
	}
	
	/*
	功能：上传玩家分数
	注意：所有玩家上传完毕后，
		  后台会推送给所有玩家分数信息，本地会接受信息
		  回调展示排行榜
	 */
	setPlayersScore(score) {
		return true;
	}
	getPlayersScore() {
		return [110,21,310,111];
	}
}


