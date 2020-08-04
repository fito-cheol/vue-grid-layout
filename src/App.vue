<template>
    <div id="app">
        <grid
            :draggable="true"
            :sortable="true"
            :items="items"
            cellWidth=100
            cellHeight=100
            
            >
            <template slot="cell" scope="props">
                <button style="width:80px; height:80px">{{props.item}} - {{props.index}} / {{props.sort}} </button>
            </template>
        </grid>
        <h1 style="text-align: center">Vue Grid Layout</h1>
        <!--<pre>{{ layout | json }}</pre>-->
        <div>
            <div class="layoutJSON">
                Displayed as <code>[x, y, w, h]</code>:
                <div class="columns">
                    <div class="layoutItem" v-for="item in layout" :key="item.i">
                        <b>{{item.i}}</b>: [{{item.x}}, {{item.y}}, {{item.w}}, {{item.h}}]
                    </div>
                </div>
            </div>
            <!--<div class="layoutJSON">
                Displayed as <code>[x, y, w, h]</code>:
                <div class="columns">
                    <div class="layoutItem" v-for="item in layout2">
                        <b>{{item.i}}</b>: [{{item.x}}, {{item.y}}, {{item.w}}, {{item.h}}]
                    </div>
                </div>
            </div>-->
        </div>
        <div id="content">
            <button @click="decreaseWidth">Decrease Width</button>
            <button @click="increaseWidth">Increase Width</button>
            <button @click="addItem">Add an item</button>
            <!-- Add to show rtl support -->
            <button @click="changeDirection">Change Direction</button>
            <input type="checkbox" v-model="draggable"/> Draggable
            <input type="checkbox" v-model="resizable"/> Resizable
            <input type="checkbox" v-model="mirrored"/> Mirrored
            <input type="checkbox" v-model="responsive"/> Responsive
            <input type="checkbox" v-model="preventCollision"/> Prevent Collision
            <div style="margin-top: 10px;margin-bottom: 10px;">
                Row Height: <input type="number" v-model="rowHeight"/> Col nums: <input type="number" v-model="colNum"/>
                Margin x: <input type="number" v-model="marginX"/> Margin y: <input type="number" v-model="marginY"/>
            </div>
            <grid-layout
                :margin="[parseInt(marginX), parseInt(marginY)]"
                    :layout.sync="layout"
                    :col-num="parseInt(colNum)"
                    :row-height="rowHeight"
                    :is-draggable="draggable"
                    :is-resizable="resizable"
                    :is-mirrored="mirrored"
                    :prevent-collision="preventCollision"
                    :vertical-compact="true"
                    :use-css-transforms="true"
                    :responsive="responsive"
                    @layout-created="layoutCreatedEvent"
                    @layout-before-mount="layoutBeforeMountEvent"
                    @layout-mounted="layoutMountedEvent"
                    @layout-ready="layoutReadyEvent"
                    @layout-updated="layoutUpdatedEvent"
                    @breakpoint-changed="breakpointChangedEvent"
            >
                <grid-item v-for="item in layout" :key="item.i"
                           :static="item.static"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                           @resize="resize"
                           @move="move"
                           @resized="resized"
                           @container-resized="containerResized"
                           @moved="moved"
                >
                    <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
                    <stock></stock>
                    <!--<button @click="clicked">CLICK ME!</button>-->
                </grid-item>
            </grid-layout>
            <hr/>
            <!--<grid-layout
                    :layout="layout2"
                    :col-num="12"
                    :row-height="rowHeight"
                    :is-draggable="draggable"
                    :is-resizable="resizable"
                    :vertical-compact="true"
                    :use-css-transforms="true"
            >
                <grid-item v-for="item in layout2" :key="item.i"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :min-w="2"
                           :min-h="2"
                           :i="item.i"
                           :is-draggable="item.draggable"
                           :is-resizable="item.resizable"
                >
                    <test-element :text="item.i"></test-element>
                </grid-item>
            </grid-layout>-->
        </div>
    </div>
</template>

<script>
    import GridItem from './components/GridItem.vue';
    import GridLayout from './components/GridLayout.vue';
    // import ResponsiveGridLayout from './components/ResponsiveGridLayout.vue';
    import TestElement from './components/TestElement.vue';
    import Stock from './components/Chart/Stock.vue';
    import CustomDragElement from './components/CustomDragElement.vue';
    import {getDocumentDir, setDocumentDir} from "./helpers/DOM";
    //var eventBus = require('./eventBus');

    let testLayout = [
        {"x":0,"y":0,"w":5,"h":15,"i":"0", resizable: true, draggable: true, static: false},
        {"x":5,"y":0,"w":5,"h":15,"i":"1", resizable: null, draggable: true, static: false},
    ];

    export default {
        name: 'app',
        components: {
            // ResponsiveGridLayout,
            GridLayout,
            GridItem,
            TestElement,
            CustomDragElement,
            Stock,
        },
        data () {
            return {
                layout: JSON.parse(JSON.stringify(testLayout)),
                layout2: JSON.parse(JSON.stringify(testLayout)),
                draggable: true,
                resizable: true,
                mirrored: false,
                responsive: true,
                preventCollision: false,
                rowHeight: 30,
                colNum: 12,
                index: 0,
                marginX: 10,
                marginY: 10,
                items: [
                    'a',
                    'b',
                    'c',
                    'a',
                    'b',
                    'c',
                    'a',
                    'b',
                    'c',
                    'a',
                    'b',
                    'c',
                    'a',
                    'b',
                    'c',
                    'a',
                    'b',
                    'c',
                    'a',
                    'b',
                    'c',
                    'a',
                    'b',
                    'c',
                ],
            }
        },
        mounted: function () {
            this.index = this.layout.length;
        },
        methods: {
            clicked: function() {
                window.alert("CLICK!");
            },
            increaseWidth: function() {
                let width = document.getElementById("content").offsetWidth;
                width += 20;
                document.getElementById("content").style.width = width+"px";
            },
            decreaseWidth: function() {
                let width = document.getElementById("content").offsetWidth;
                width -= 20;
                document.getElementById("content").style.width = width+"px";
            },
            removeItem: function(item) {
                //console.log("### REMOVE " + item.i);
                this.layout.splice(this.layout.indexOf(item), 1);
            },
            addItem: function() {
                // let self = this;
                //console.log("### LENGTH: " + this.layout.length);
                let item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
                this.index++;
                this.layout.push(item);
            },
            move: function(i, newX, newY){
                console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
            },
            resize: function(i, newH, newW, newHPx, newWPx){
                console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },
            moved: function(i, newX, newY){
                console.log("### MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
            },
            resized: function(i, newH, newW, newHPx, newWPx){
                console.log("### RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },
            containerResized: function(i, newH, newW, newHPx, newWPx){
                console.log("### CONTAINER RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },
            /**
             * Add change direction button
             */
            changeDirection() {
                let documentDirection = getDocumentDir();
                let toggle = "";
                if (documentDirection === "rtl") {
                    toggle = "ltr"
                } else {
                    toggle = "rtl"
                }
                setDocumentDir(toggle);
                //eventBus.$emit('directionchange');
            },

            layoutCreatedEvent: function(newLayout){
                console.log("Created layout: ", newLayout)
            },
            layoutBeforeMountEvent: function(newLayout){
                console.log("beforeMount layout: ", newLayout)
            },
            layoutMountedEvent: function(newLayout){
                console.log("Mounted layout: ", newLayout)
            },
            layoutReadyEvent: function(newLayout){
                console.log("Ready layout: ", newLayout)
            },
            layoutUpdatedEvent: function(newLayout){
                console.log("Updated layout: ", newLayout)
            },
            breakpointChangedEvent: function(newBreakpoint, newLayout){
                console.log("breakpoint changed breakpoint=", newBreakpoint, ", layout: ", newLayout );
            }

        },
    }
</script>

<style>
    /*    #app {
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;
            margin-top: 60px;
        }

        h1, h2 {
            font-weight: normal;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            display: inline-block;
            margin: 0 10px;
        }

        a {
            color: #42b983;
        }*/
</style>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
