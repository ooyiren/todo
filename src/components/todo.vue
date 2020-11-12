<template>
	<div>
		<div style="width: 800px;margin: auto;">
			<div style="width: 100%;color: orange;font-size: 40px;">
				TO-DO
			</div>
			<div style="width: 100%;color: orange;font-size: 20px;">
				记录你的每一刻好生活 </div>
			<div style="width: 100%;font-size: 20px;">

				<el-tooltip class="item" effect="dark" content="点击新增记录" placement="top-start">
					<i class="el-icon-edit" style="font-size: 50px;" @click="addInfo()"></i>
				</el-tooltip>
			</div>
			<el-collapse accordion>
				<el-collapse-item v-for="(item,index) in todoList">
					<template slot="title">
						{{item.title}}
						<el-tag v-if="item.isZ==true" class="tab" type="danger">未办</el-tag>
						<el-tag v-if="item.isZ==false" class="tab" type="info">已办</el-tag>
					</template>
					<div>
						{{item.context}}
					</div>
					<div style="width: 80%;margin: auto;text-align: right;margin-top: 20px;">
						{{item.time}}
					</div>
					<div class="cz">
						<el-button type="danger" style="margin-right: 20px;" round @click="deleinfo(index)">删除</el-button>
						<el-switch v-model="item.isZ==true" @change="switchChage(index)" active-text="未办" inactive-text="已办">
						</el-switch>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
		<el-dialog title="信息添加" :visible.sync="addBox" width="30%" :before-close="handleClose">
			<span>
				<el-form ref="form" :model="form" label-width="100px">
					<el-form-item label="待办事标题">
						<el-input v-model="form.name"></el-input>
					</el-form-item>


					<el-form-item label="待办事内容">
						<el-input type="textarea" v-model="form.desc"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">立即创建</el-button>
						<el-button @click="addBox=false">取消</el-button>
					</el-form-item>
				</el-form>

			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'todo',
		data() {
			return {
				addBox: false,
				todoList: [],
				form: {
					name: '',
					desc: ''
				}
			}
		},
		methods: {
			switchChage(index) {
				this.todoList[index].isZ = !this.todoList[index].isZ
			},
			//这里打开添加信息框，在此之前删除信息框中的信息
			addInfo() {
				this.form.name = ""
				this.form.desc = ""
				this.addBox = true
			},
			//时间从最近的开始
			pcompare(prop, rev) {
				if (rev === undefined) {
					rev = 1;
				} else {
					rev = rev ? 1 : -1;
				}
				return function(obj1, obj2) {
					var val1 = obj1[prop],
						val2 = obj2[prop];
					return val1 < val2 ? rev * (-1) : rev * 1;
				}
			},
			//删除记录
			deleinfo(index) {


				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.todoList.splice(index, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//获取当前时间
			nowDateTime() {
				let time = ''
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
				return time = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;

			},
			//添加记录
			onSubmit() {

				this.$confirm('此操作将新增待办记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let todox = {
						title: this.form.name,
						isZ: true,
						context: this.form.desc,
						time: this.nowDateTime()
					}
					this.todoList.push(todox)
					this.todoList.sort(this.pcompare("time", false));
					//添加完成之后进行重新排序
					this.addBox = false
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消添加'
					});
				});


			}
		}
	}
</script>

<style>
	.tab {
		margin-left: 20px;
	}

	.cz {
		margin-top: 20px;
		width: 200px;
		float: right;
		padding-bottom: 20px;
	}
</style>
