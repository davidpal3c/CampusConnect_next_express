/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 5535.0, "series": [{"data": [[0.0, 0.0], [0.1, 0.0], [0.2, 1.0], [0.3, 1.0], [0.4, 1.0], [0.5, 1.0], [0.6, 1.0], [0.7, 1.0], [0.8, 1.0], [0.9, 1.0], [1.0, 1.0], [1.1, 1.0], [1.2, 1.0], [1.3, 2.0], [1.4, 2.0], [1.5, 127.0], [1.6, 161.0], [1.7, 166.0], [1.8, 169.0], [1.9, 170.0], [2.0, 172.0], [2.1, 174.0], [2.2, 175.0], [2.3, 176.0], [2.4, 178.0], [2.5, 180.0], [2.6, 181.0], [2.7, 183.0], [2.8, 185.0], [2.9, 187.0], [3.0, 188.0], [3.1, 190.0], [3.2, 191.0], [3.3, 194.0], [3.4, 196.0], [3.5, 198.0], [3.6, 200.0], [3.7, 204.0], [3.8, 206.0], [3.9, 208.0], [4.0, 211.0], [4.1, 214.0], [4.2, 215.0], [4.3, 217.0], [4.4, 219.0], [4.5, 221.0], [4.6, 223.0], [4.7, 225.0], [4.8, 227.0], [4.9, 229.0], [5.0, 231.0], [5.1, 233.0], [5.2, 236.0], [5.3, 239.0], [5.4, 241.0], [5.5, 244.0], [5.6, 246.0], [5.7, 248.0], [5.8, 251.0], [5.9, 252.0], [6.0, 254.0], [6.1, 256.0], [6.2, 257.0], [6.3, 259.0], [6.4, 261.0], [6.5, 263.0], [6.6, 265.0], [6.7, 267.0], [6.8, 269.0], [6.9, 272.0], [7.0, 275.0], [7.1, 279.0], [7.2, 282.0], [7.3, 284.0], [7.4, 287.0], [7.5, 289.0], [7.6, 291.0], [7.7, 292.0], [7.8, 294.0], [7.9, 296.0], [8.0, 297.0], [8.1, 299.0], [8.2, 301.0], [8.3, 303.0], [8.4, 305.0], [8.5, 307.0], [8.6, 310.0], [8.7, 313.0], [8.8, 315.0], [8.9, 318.0], [9.0, 320.0], [9.1, 323.0], [9.2, 325.0], [9.3, 327.0], [9.4, 330.0], [9.5, 331.0], [9.6, 332.0], [9.7, 334.0], [9.8, 336.0], [9.9, 338.0], [10.0, 340.0], [10.1, 342.0], [10.2, 345.0], [10.3, 347.0], [10.4, 349.0], [10.5, 351.0], [10.6, 353.0], [10.7, 355.0], [10.8, 358.0], [10.9, 360.0], [11.0, 362.0], [11.1, 364.0], [11.2, 366.0], [11.3, 368.0], [11.4, 370.0], [11.5, 372.0], [11.6, 373.0], [11.7, 376.0], [11.8, 378.0], [11.9, 380.0], [12.0, 382.0], [12.1, 384.0], [12.2, 387.0], [12.3, 389.0], [12.4, 391.0], [12.5, 392.0], [12.6, 394.0], [12.7, 396.0], [12.8, 398.0], [12.9, 400.0], [13.0, 402.0], [13.1, 404.0], [13.2, 406.0], [13.3, 408.0], [13.4, 410.0], [13.5, 412.0], [13.6, 415.0], [13.7, 417.0], [13.8, 419.0], [13.9, 421.0], [14.0, 423.0], [14.1, 424.0], [14.2, 426.0], [14.3, 427.0], [14.4, 429.0], [14.5, 430.0], [14.6, 433.0], [14.7, 435.0], [14.8, 437.0], [14.9, 440.0], [15.0, 444.0], [15.1, 449.0], [15.2, 456.0], [15.3, 465.0], [15.4, 472.0], [15.5, 478.0], [15.6, 484.0], [15.7, 488.0], [15.8, 492.0], [15.9, 496.0], [16.0, 498.0], [16.1, 500.0], [16.2, 503.0], [16.3, 505.0], [16.4, 507.0], [16.5, 509.0], [16.6, 511.0], [16.7, 513.0], [16.8, 514.0], [16.9, 516.0], [17.0, 517.0], [17.1, 519.0], [17.2, 521.0], [17.3, 522.0], [17.4, 523.0], [17.5, 525.0], [17.6, 526.0], [17.7, 528.0], [17.8, 529.0], [17.9, 531.0], [18.0, 532.0], [18.1, 534.0], [18.2, 536.0], [18.3, 537.0], [18.4, 538.0], [18.5, 539.0], [18.6, 540.0], [18.7, 542.0], [18.8, 543.0], [18.9, 545.0], [19.0, 546.0], [19.1, 547.0], [19.2, 548.0], [19.3, 550.0], [19.4, 551.0], [19.5, 553.0], [19.6, 554.0], [19.7, 555.0], [19.8, 557.0], [19.9, 559.0], [20.0, 560.0], [20.1, 562.0], [20.2, 564.0], [20.3, 566.0], [20.4, 567.0], [20.5, 570.0], [20.6, 572.0], [20.7, 574.0], [20.8, 576.0], [20.9, 578.0], [21.0, 580.0], [21.1, 583.0], [21.2, 584.0], [21.3, 587.0], [21.4, 589.0], [21.5, 592.0], [21.6, 593.0], [21.7, 596.0], [21.8, 598.0], [21.9, 600.0], [22.0, 602.0], [22.1, 604.0], [22.2, 606.0], [22.3, 608.0], [22.4, 610.0], [22.5, 613.0], [22.6, 615.0], [22.7, 617.0], [22.8, 619.0], [22.9, 621.0], [23.0, 623.0], [23.1, 625.0], [23.2, 627.0], [23.3, 628.0], [23.4, 631.0], [23.5, 632.0], [23.6, 635.0], [23.7, 637.0], [23.8, 639.0], [23.9, 640.0], [24.0, 642.0], [24.1, 644.0], [24.2, 646.0], [24.3, 648.0], [24.4, 651.0], [24.5, 652.0], [24.6, 654.0], [24.7, 656.0], [24.8, 658.0], [24.9, 661.0], [25.0, 663.0], [25.1, 664.0], [25.2, 666.0], [25.3, 668.0], [25.4, 670.0], [25.5, 672.0], [25.6, 674.0], [25.7, 676.0], [25.8, 678.0], [25.9, 681.0], [26.0, 683.0], [26.1, 684.0], [26.2, 686.0], [26.3, 688.0], [26.4, 691.0], [26.5, 694.0], [26.6, 695.0], [26.7, 698.0], [26.8, 700.0], [26.9, 703.0], [27.0, 705.0], [27.1, 707.0], [27.2, 709.0], [27.3, 711.0], [27.4, 713.0], [27.5, 714.0], [27.6, 715.0], [27.7, 716.0], [27.8, 718.0], [27.9, 719.0], [28.0, 721.0], [28.1, 722.0], [28.2, 723.0], [28.3, 724.0], [28.4, 726.0], [28.5, 727.0], [28.6, 728.0], [28.7, 729.0], [28.8, 730.0], [28.9, 731.0], [29.0, 732.0], [29.1, 732.0], [29.2, 733.0], [29.3, 734.0], [29.4, 735.0], [29.5, 735.0], [29.6, 736.0], [29.7, 737.0], [29.8, 737.0], [29.9, 738.0], [30.0, 739.0], [30.1, 739.0], [30.2, 740.0], [30.3, 740.0], [30.4, 741.0], [30.5, 741.0], [30.6, 742.0], [30.7, 742.0], [30.8, 743.0], [30.9, 743.0], [31.0, 744.0], [31.1, 744.0], [31.2, 745.0], [31.3, 745.0], [31.4, 746.0], [31.5, 746.0], [31.6, 746.0], [31.7, 747.0], [31.8, 747.0], [31.9, 748.0], [32.0, 748.0], [32.1, 748.0], [32.2, 749.0], [32.3, 749.0], [32.4, 749.0], [32.5, 750.0], [32.6, 750.0], [32.7, 750.0], [32.8, 751.0], [32.9, 751.0], [33.0, 752.0], [33.1, 752.0], [33.2, 752.0], [33.3, 752.0], [33.4, 753.0], [33.5, 753.0], [33.6, 753.0], [33.7, 754.0], [33.8, 754.0], [33.9, 754.0], [34.0, 755.0], [34.1, 755.0], [34.2, 755.0], [34.3, 755.0], [34.4, 756.0], [34.5, 756.0], [34.6, 756.0], [34.7, 756.0], [34.8, 757.0], [34.9, 757.0], [35.0, 757.0], [35.1, 758.0], [35.2, 758.0], [35.3, 758.0], [35.4, 758.0], [35.5, 759.0], [35.6, 759.0], [35.7, 759.0], [35.8, 759.0], [35.9, 760.0], [36.0, 760.0], [36.1, 760.0], [36.2, 760.0], [36.3, 760.0], [36.4, 761.0], [36.5, 761.0], [36.6, 761.0], [36.7, 761.0], [36.8, 761.0], [36.9, 762.0], [37.0, 762.0], [37.1, 762.0], [37.2, 762.0], [37.3, 762.0], [37.4, 763.0], [37.5, 763.0], [37.6, 763.0], [37.7, 763.0], [37.8, 763.0], [37.9, 764.0], [38.0, 764.0], [38.1, 764.0], [38.2, 764.0], [38.3, 764.0], [38.4, 765.0], [38.5, 765.0], [38.6, 765.0], [38.7, 765.0], [38.8, 765.0], [38.9, 765.0], [39.0, 766.0], [39.1, 766.0], [39.2, 766.0], [39.3, 766.0], [39.4, 767.0], [39.5, 767.0], [39.6, 767.0], [39.7, 767.0], [39.8, 767.0], [39.9, 768.0], [40.0, 768.0], [40.1, 768.0], [40.2, 768.0], [40.3, 768.0], [40.4, 769.0], [40.5, 769.0], [40.6, 769.0], [40.7, 769.0], [40.8, 769.0], [40.9, 769.0], [41.0, 770.0], [41.1, 770.0], [41.2, 770.0], [41.3, 770.0], [41.4, 770.0], [41.5, 770.0], [41.6, 771.0], [41.7, 771.0], [41.8, 771.0], [41.9, 771.0], [42.0, 771.0], [42.1, 771.0], [42.2, 772.0], [42.3, 772.0], [42.4, 772.0], [42.5, 772.0], [42.6, 772.0], [42.7, 772.0], [42.8, 772.0], [42.9, 773.0], [43.0, 773.0], [43.1, 773.0], [43.2, 773.0], [43.3, 773.0], [43.4, 773.0], [43.5, 774.0], [43.6, 774.0], [43.7, 774.0], [43.8, 774.0], [43.9, 774.0], [44.0, 774.0], [44.1, 774.0], [44.2, 775.0], [44.3, 775.0], [44.4, 775.0], [44.5, 775.0], [44.6, 775.0], [44.7, 775.0], [44.8, 775.0], [44.9, 776.0], [45.0, 776.0], [45.1, 776.0], [45.2, 776.0], [45.3, 776.0], [45.4, 776.0], [45.5, 777.0], [45.6, 777.0], [45.7, 777.0], [45.8, 777.0], [45.9, 777.0], [46.0, 777.0], [46.1, 778.0], [46.2, 778.0], [46.3, 778.0], [46.4, 778.0], [46.5, 778.0], [46.6, 778.0], [46.7, 778.0], [46.8, 779.0], [46.9, 779.0], [47.0, 779.0], [47.1, 779.0], [47.2, 779.0], [47.3, 779.0], [47.4, 779.0], [47.5, 780.0], [47.6, 780.0], [47.7, 780.0], [47.8, 780.0], [47.9, 780.0], [48.0, 780.0], [48.1, 780.0], [48.2, 781.0], [48.3, 781.0], [48.4, 781.0], [48.5, 781.0], [48.6, 781.0], [48.7, 781.0], [48.8, 782.0], [48.9, 782.0], [49.0, 782.0], [49.1, 782.0], [49.2, 782.0], [49.3, 782.0], [49.4, 782.0], [49.5, 782.0], [49.6, 783.0], [49.7, 783.0], [49.8, 783.0], [49.9, 783.0], [50.0, 783.0], [50.1, 783.0], [50.2, 783.0], [50.3, 784.0], [50.4, 784.0], [50.5, 784.0], [50.6, 784.0], [50.7, 784.0], [50.8, 784.0], [50.9, 784.0], [51.0, 785.0], [51.1, 785.0], [51.2, 785.0], [51.3, 785.0], [51.4, 785.0], [51.5, 785.0], [51.6, 785.0], [51.7, 786.0], [51.8, 786.0], [51.9, 786.0], [52.0, 786.0], [52.1, 786.0], [52.2, 786.0], [52.3, 786.0], [52.4, 787.0], [52.5, 787.0], [52.6, 787.0], [52.7, 787.0], [52.8, 787.0], [52.9, 787.0], [53.0, 787.0], [53.1, 788.0], [53.2, 788.0], [53.3, 788.0], [53.4, 788.0], [53.5, 788.0], [53.6, 788.0], [53.7, 788.0], [53.8, 788.0], [53.9, 789.0], [54.0, 789.0], [54.1, 789.0], [54.2, 789.0], [54.3, 789.0], [54.4, 789.0], [54.5, 789.0], [54.6, 789.0], [54.7, 790.0], [54.8, 790.0], [54.9, 790.0], [55.0, 790.0], [55.1, 790.0], [55.2, 790.0], [55.3, 790.0], [55.4, 791.0], [55.5, 791.0], [55.6, 791.0], [55.7, 791.0], [55.8, 791.0], [55.9, 791.0], [56.0, 792.0], [56.1, 792.0], [56.2, 792.0], [56.3, 792.0], [56.4, 792.0], [56.5, 792.0], [56.6, 792.0], [56.7, 793.0], [56.8, 793.0], [56.9, 793.0], [57.0, 793.0], [57.1, 793.0], [57.2, 793.0], [57.3, 793.0], [57.4, 794.0], [57.5, 794.0], [57.6, 794.0], [57.7, 794.0], [57.8, 794.0], [57.9, 794.0], [58.0, 795.0], [58.1, 795.0], [58.2, 795.0], [58.3, 795.0], [58.4, 795.0], [58.5, 795.0], [58.6, 795.0], [58.7, 796.0], [58.8, 796.0], [58.9, 796.0], [59.0, 796.0], [59.1, 796.0], [59.2, 796.0], [59.3, 796.0], [59.4, 797.0], [59.5, 797.0], [59.6, 797.0], [59.7, 797.0], [59.8, 797.0], [59.9, 797.0], [60.0, 798.0], [60.1, 798.0], [60.2, 798.0], [60.3, 798.0], [60.4, 798.0], [60.5, 798.0], [60.6, 799.0], [60.7, 799.0], [60.8, 799.0], [60.9, 799.0], [61.0, 799.0], [61.1, 799.0], [61.2, 800.0], [61.3, 800.0], [61.4, 800.0], [61.5, 800.0], [61.6, 800.0], [61.7, 800.0], [61.8, 800.0], [61.9, 801.0], [62.0, 801.0], [62.1, 801.0], [62.2, 801.0], [62.3, 801.0], [62.4, 801.0], [62.5, 802.0], [62.6, 802.0], [62.7, 802.0], [62.8, 802.0], [62.9, 802.0], [63.0, 802.0], [63.1, 803.0], [63.2, 803.0], [63.3, 803.0], [63.4, 803.0], [63.5, 803.0], [63.6, 804.0], [63.7, 804.0], [63.8, 804.0], [63.9, 804.0], [64.0, 804.0], [64.1, 804.0], [64.2, 805.0], [64.3, 805.0], [64.4, 805.0], [64.5, 805.0], [64.6, 805.0], [64.7, 805.0], [64.8, 806.0], [64.9, 806.0], [65.0, 806.0], [65.1, 806.0], [65.2, 806.0], [65.3, 806.0], [65.4, 807.0], [65.5, 807.0], [65.6, 807.0], [65.7, 807.0], [65.8, 807.0], [65.9, 808.0], [66.0, 808.0], [66.1, 808.0], [66.2, 808.0], [66.3, 808.0], [66.4, 808.0], [66.5, 808.0], [66.6, 809.0], [66.7, 809.0], [66.8, 809.0], [66.9, 809.0], [67.0, 809.0], [67.1, 809.0], [67.2, 810.0], [67.3, 810.0], [67.4, 810.0], [67.5, 810.0], [67.6, 810.0], [67.7, 810.0], [67.8, 811.0], [67.9, 811.0], [68.0, 811.0], [68.1, 811.0], [68.2, 811.0], [68.3, 812.0], [68.4, 812.0], [68.5, 812.0], [68.6, 812.0], [68.7, 812.0], [68.8, 812.0], [68.9, 813.0], [69.0, 813.0], [69.1, 813.0], [69.2, 813.0], [69.3, 813.0], [69.4, 814.0], [69.5, 814.0], [69.6, 814.0], [69.7, 814.0], [69.8, 814.0], [69.9, 814.0], [70.0, 815.0], [70.1, 815.0], [70.2, 815.0], [70.3, 815.0], [70.4, 815.0], [70.5, 816.0], [70.6, 816.0], [70.7, 816.0], [70.8, 816.0], [70.9, 816.0], [71.0, 817.0], [71.1, 817.0], [71.2, 817.0], [71.3, 817.0], [71.4, 817.0], [71.5, 817.0], [71.6, 818.0], [71.7, 818.0], [71.8, 818.0], [71.9, 818.0], [72.0, 818.0], [72.1, 819.0], [72.2, 819.0], [72.3, 819.0], [72.4, 819.0], [72.5, 819.0], [72.6, 820.0], [72.7, 820.0], [72.8, 820.0], [72.9, 820.0], [73.0, 820.0], [73.1, 821.0], [73.2, 821.0], [73.3, 821.0], [73.4, 821.0], [73.5, 822.0], [73.6, 822.0], [73.7, 822.0], [73.8, 822.0], [73.9, 822.0], [74.0, 823.0], [74.1, 823.0], [74.2, 823.0], [74.3, 823.0], [74.4, 823.0], [74.5, 824.0], [74.6, 824.0], [74.7, 824.0], [74.8, 824.0], [74.9, 824.0], [75.0, 825.0], [75.1, 825.0], [75.2, 825.0], [75.3, 825.0], [75.4, 826.0], [75.5, 826.0], [75.6, 826.0], [75.7, 826.0], [75.8, 826.0], [75.9, 827.0], [76.0, 827.0], [76.1, 827.0], [76.2, 827.0], [76.3, 827.0], [76.4, 828.0], [76.5, 828.0], [76.6, 828.0], [76.7, 828.0], [76.8, 828.0], [76.9, 829.0], [77.0, 829.0], [77.1, 829.0], [77.2, 829.0], [77.3, 829.0], [77.4, 830.0], [77.5, 830.0], [77.6, 830.0], [77.7, 830.0], [77.8, 830.0], [77.9, 831.0], [78.0, 831.0], [78.1, 831.0], [78.2, 831.0], [78.3, 832.0], [78.4, 832.0], [78.5, 832.0], [78.6, 832.0], [78.7, 833.0], [78.8, 833.0], [78.9, 833.0], [79.0, 833.0], [79.1, 833.0], [79.2, 834.0], [79.3, 834.0], [79.4, 834.0], [79.5, 834.0], [79.6, 835.0], [79.7, 835.0], [79.8, 835.0], [79.9, 835.0], [80.0, 835.0], [80.1, 836.0], [80.2, 836.0], [80.3, 836.0], [80.4, 836.0], [80.5, 837.0], [80.6, 837.0], [80.7, 837.0], [80.8, 837.0], [80.9, 838.0], [81.0, 838.0], [81.1, 838.0], [81.2, 838.0], [81.3, 839.0], [81.4, 839.0], [81.5, 839.0], [81.6, 839.0], [81.7, 840.0], [81.8, 840.0], [81.9, 840.0], [82.0, 840.0], [82.1, 841.0], [82.2, 841.0], [82.3, 841.0], [82.4, 841.0], [82.5, 842.0], [82.6, 842.0], [82.7, 842.0], [82.8, 842.0], [82.9, 843.0], [83.0, 843.0], [83.1, 843.0], [83.2, 843.0], [83.3, 844.0], [83.4, 844.0], [83.5, 844.0], [83.6, 844.0], [83.7, 845.0], [83.8, 845.0], [83.9, 845.0], [84.0, 845.0], [84.1, 846.0], [84.2, 846.0], [84.3, 846.0], [84.4, 847.0], [84.5, 847.0], [84.6, 847.0], [84.7, 848.0], [84.8, 848.0], [84.9, 848.0], [85.0, 848.0], [85.1, 849.0], [85.2, 849.0], [85.3, 849.0], [85.4, 849.0], [85.5, 850.0], [85.6, 850.0], [85.7, 851.0], [85.8, 851.0], [85.9, 851.0], [86.0, 851.0], [86.1, 852.0], [86.2, 852.0], [86.3, 852.0], [86.4, 853.0], [86.5, 853.0], [86.6, 854.0], [86.7, 854.0], [86.8, 854.0], [86.9, 854.0], [87.0, 855.0], [87.1, 855.0], [87.2, 855.0], [87.3, 856.0], [87.4, 856.0], [87.5, 856.0], [87.6, 857.0], [87.7, 857.0], [87.8, 858.0], [87.9, 858.0], [88.0, 858.0], [88.1, 859.0], [88.2, 859.0], [88.3, 860.0], [88.4, 860.0], [88.5, 860.0], [88.6, 861.0], [88.7, 861.0], [88.8, 862.0], [88.9, 862.0], [89.0, 862.0], [89.1, 863.0], [89.2, 863.0], [89.3, 864.0], [89.4, 864.0], [89.5, 865.0], [89.6, 865.0], [89.7, 866.0], [89.8, 866.0], [89.9, 867.0], [90.0, 867.0], [90.1, 868.0], [90.2, 868.0], [90.3, 868.0], [90.4, 869.0], [90.5, 869.0], [90.6, 870.0], [90.7, 870.0], [90.8, 871.0], [90.9, 871.0], [91.0, 872.0], [91.1, 872.0], [91.2, 873.0], [91.3, 873.0], [91.4, 874.0], [91.5, 874.0], [91.6, 875.0], [91.7, 875.0], [91.8, 876.0], [91.9, 876.0], [92.0, 877.0], [92.1, 877.0], [92.2, 878.0], [92.3, 879.0], [92.4, 879.0], [92.5, 880.0], [92.6, 881.0], [92.7, 881.0], [92.8, 882.0], [92.9, 883.0], [93.0, 884.0], [93.1, 884.0], [93.2, 885.0], [93.3, 886.0], [93.4, 887.0], [93.5, 888.0], [93.6, 888.0], [93.7, 889.0], [93.8, 890.0], [93.9, 891.0], [94.0, 892.0], [94.1, 892.0], [94.2, 893.0], [94.3, 894.0], [94.4, 895.0], [94.5, 896.0], [94.6, 897.0], [94.7, 898.0], [94.8, 899.0], [94.9, 900.0], [95.0, 901.0], [95.1, 903.0], [95.2, 904.0], [95.3, 905.0], [95.4, 906.0], [95.5, 907.0], [95.6, 908.0], [95.7, 909.0], [95.8, 911.0], [95.9, 912.0], [96.0, 914.0], [96.1, 915.0], [96.2, 917.0], [96.3, 918.0], [96.4, 920.0], [96.5, 921.0], [96.6, 923.0], [96.7, 925.0], [96.8, 927.0], [96.9, 929.0], [97.0, 932.0], [97.1, 934.0], [97.2, 937.0], [97.3, 940.0], [97.4, 944.0], [97.5, 947.0], [97.6, 952.0], [97.7, 957.0], [97.8, 964.0], [97.9, 974.0], [98.0, 986.0], [98.1, 998.0], [98.2, 1018.0], [98.3, 1034.0], [98.4, 1061.0], [98.5, 1082.0], [98.6, 1110.0], [98.7, 1132.0], [98.8, 1147.0], [98.9, 1166.0], [99.0, 1193.0], [99.1, 1252.0], [99.2, 1498.0], [99.3, 1999.0], [99.4, 2403.0], [99.5, 2962.0], [99.6, 3191.0], [99.7, 4951.0], [99.8, 5204.0], [99.9, 5297.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 11495.0, "series": [{"data": [[0.0, 499.0], [600.0, 1628.0], [700.0, 11495.0], [800.0, 11238.0], [900.0, 1086.0], [1000.0, 155.0], [1100.0, 146.0], [1200.0, 48.0], [1300.0, 9.0], [1400.0, 8.0], [1500.0, 6.0], [1600.0, 6.0], [100.0, 691.0], [1700.0, 11.0], [1800.0, 7.0], [1900.0, 4.0], [2000.0, 9.0], [2100.0, 9.0], [2300.0, 9.0], [2200.0, 5.0], [2400.0, 11.0], [2500.0, 5.0], [2600.0, 6.0], [2700.0, 2.0], [2800.0, 3.0], [2900.0, 15.0], [3000.0, 13.0], [3100.0, 15.0], [3200.0, 16.0], [3300.0, 6.0], [200.0, 1526.0], [3400.0, 4.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [300.0, 1583.0], [4900.0, 4.0], [5000.0, 15.0], [5100.0, 15.0], [5200.0, 35.0], [5300.0, 10.0], [5400.0, 9.0], [5500.0, 14.0], [400.0, 1062.0], [500.0, 1943.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 214.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 27741.0, "series": [{"data": [[0.0, 4875.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 27741.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 214.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 554.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.74210012E12, "maxY": 63.985999999999926, "series": [{"data": [[1.74210012E12, 1.0], [1.7421003E12, 1.0], [1.74210024E12, 1.0], [1.74210042E12, 1.0], [1.74210036E12, 1.0], [1.74210018E12, 1.0]], "isOverall": false, "label": "UserLogin  - Scenario 1", "isController": false}, {"data": [[1.74210012E12, 45.839424141749625], [1.7421006E12, 50.0], [1.7421003E12, 50.0], [1.74210024E12, 50.0], [1.74210042E12, 50.0], [1.74210036E12, 50.0], [1.74210054E12, 50.0], [1.74210048E12, 50.0], [1.74210018E12, 50.0]], "isOverall": false, "label": "GetArticlesData - Scenario 3 (stress testing)", "isController": false}, {"data": [[1.74210012E12, 1.7812499999999996], [1.7421003E12, 1.3232323232323235], [1.74210024E12, 1.4100000000000004], [1.74210042E12, 1.5362318840579716], [1.74210036E12, 1.2871287128712863], [1.74210018E12, 1.2626262626262632]], "isOverall": false, "label": "GetArticlesData - Scenario1", "isController": false}, {"data": [[1.74210012E12, 63.985999999999926]], "isOverall": false, "label": "GetArticlesData  - Scenario 2", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7421006E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 263.83333333333337, "minX": 42.0, "maxY": 3336.0, "series": [{"data": [[43.0, 322.875], [42.0, 268.75], [44.0, 342.0], [45.0, 324.0], [47.0, 371.0], [46.0, 343.0], [49.0, 396.83333333333337], [48.0, 345.3333333333333], [51.0, 712.0140632847817], [50.0, 712.3345434010979], [52.0, 709.7300719424446], [53.0, 1004.0108401084009], [55.0, 499.8181818181818], [54.0, 451.50000000000006], [57.0, 439.0769230769231], [56.0, 505.5], [59.0, 507.9411764705883], [58.0, 522.0000000000001], [61.0, 525.5555555555555], [60.0, 557.8571428571429], [62.0, 515.5], [63.0, 448.2857142857142], [67.0, 587.3749999999999], [66.0, 651.6153846153845], [65.0, 569.25], [64.0, 463.125], [71.0, 786.0810810810813], [70.0, 714.8000000000001], [69.0, 582.7857142857141], [68.0, 587.9999999999999], [72.0, 803.8666666666668], [73.0, 672.3846153846155], [74.0, 758.551724137931], [75.0, 760.4666666666666], [77.0, 734.8125], [79.0, 823.7142857142858], [76.0, 738.6000000000001], [78.0, 852.6190476190476], [83.0, 1015.0952380952381], [82.0, 1129.0], [81.0, 861.2857142857142], [80.0, 761.4], [87.0, 958.2], [86.0, 912.7777777777778], [84.0, 1079.7619047619048], [85.0, 842.9166666666666], [90.0, 929.75], [88.0, 823.8333333333334], [89.0, 263.83333333333337], [91.0, 806.0], [94.0, 1174.8571428571427], [93.0, 902.5454545454545], [92.0, 1108.0], [95.0, 883.7777777777777], [99.0, 1298.0], [98.0, 1090.0], [96.0, 975.5454545454546], [97.0, 928.7272727272726], [103.0, 1681.0], [102.0, 1548.75], [101.0, 1445.0], [107.0, 1472.0], [106.0, 1433.0], [105.0, 1713.0], [104.0, 1563.5], [111.0, 1766.0], [109.0, 1591.0], [115.0, 1705.0], [114.0, 1686.0], [113.0, 1525.0], [112.0, 1684.3333333333333], [118.0, 1643.0], [117.0, 3230.0], [116.0, 1945.0], [122.0, 2083.0], [121.0, 1748.5], [120.0, 1752.6666666666667], [127.0, 2127.5], [125.0, 1791.0], [124.0, 2638.5], [135.0, 2066.0], [134.0, 2072.0], [133.0, 1829.0], [131.0, 2293.3333333333335], [130.0, 2208.0], [129.0, 3191.0], [128.0, 1946.0], [142.0, 3157.0], [141.0, 2340.0], [140.0, 3119.0], [139.0, 2106.0], [138.0, 2695.3333333333335], [136.0, 3221.5], [151.0, 3274.0], [150.0, 2399.0], [149.0, 3271.0], [148.0, 2761.5], [147.0, 2138.0], [146.0, 1922.0], [144.0, 3086.0], [159.0, 2903.3333333333335], [156.0, 2654.0], [154.0, 3335.0], [153.0, 2148.5], [166.0, 2460.0], [165.0, 2749.6666666666665], [164.0, 3336.0], [163.0, 3283.0], [162.0, 3111.0], [161.0, 2301.0], [160.0, 2283.0], [175.0, 3281.0], [174.0, 2076.0], [173.0, 2561.0], [172.0, 2662.0], [171.0, 2421.0], [170.0, 2606.0], [169.0, 3082.0], [168.0, 3124.0], [177.0, 2252.25], [178.0, 776.25], [179.0, 1089.5], [183.0, 2165.0], [181.0, 3171.0], [180.0, 2505.0], [176.0, 2839.0], [191.0, 3218.0], [190.0, 2990.0], [189.0, 2448.0], [188.0, 2631.5], [187.0, 2712.0], [186.0, 2968.0], [185.0, 2780.0], [184.0, 2278.5], [199.0, 2272.0], [197.0, 3230.0], [196.0, 3171.3333333333335], [195.0, 2193.0], [194.0, 3014.0], [193.0, 3204.0], [192.0, 2962.0], [207.0, 2703.5], [206.0, 3036.0], [205.0, 2967.0], [204.0, 2359.0], [202.0, 2526.0], [201.0, 2900.0], [200.0, 2993.0], [209.0, 2354.0], [210.0, 2953.2], [211.0, 2765.0], [212.0, 2486.0], [213.0, 2927.0], [215.0, 2713.5], [214.0, 2826.8], [208.0, 3109.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[51.76461778097309, 727.085250419358]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 215.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 8400.0, "minX": 1.74210012E12, "maxY": 98345.83333333333, "series": [{"data": [[1.74210012E12, 8400.0], [1.7421006E12, 14367.466666666667], [1.7421003E12, 24784.3], [1.74210024E12, 23305.783333333333], [1.74210042E12, 22889.966666666667], [1.74210036E12, 24960.483333333334], [1.74210054E12, 23716.55], [1.74210048E12, 23665.4], [1.74210018E12, 24426.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74210012E12, 33090.166666666664], [1.7421006E12, 56880.0], [1.7421003E12, 97648.33333333333], [1.74210024E12, 91775.83333333333], [1.74210042E12, 89803.16666666667], [1.74210036E12, 98345.83333333333], [1.74210054E12, 93892.5], [1.74210048E12, 93690.0], [1.74210018E12, 96230.83333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7421006E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 694.2584140156766, "minX": 1.74210012E12, "maxY": 904.1768707482978, "series": [{"data": [[1.74210012E12, 904.1768707482978], [1.7421006E12, 712.0225474683533], [1.7421003E12, 694.2584140156766], [1.74210024E12, 751.4643119941128], [1.74210042E12, 760.318796992481], [1.74210036E12, 699.9068436713218], [1.74210054E12, 717.974358974359], [1.74210048E12, 713.2814601344892], [1.74210018E12, 704.2554385964905]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7421006E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 694.254725680038, "minX": 1.74210012E12, "maxY": 904.1612244897951, "series": [{"data": [[1.74210012E12, 904.1612244897951], [1.7421006E12, 712.0189873417723], [1.7421003E12, 694.254725680038], [1.74210024E12, 751.4591611479007], [1.74210042E12, 760.3157894736846], [1.74210036E12, 699.9034103913933], [1.74210054E12, 717.972202252576], [1.74210048E12, 713.2766570605207], [1.74210018E12, 704.24701754386]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7421006E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.74210012E12, "maxY": 0.47755102040816333, "series": [{"data": [[1.74210012E12, 0.47755102040816333], [1.7421006E12, 0.0], [1.7421003E12, 0.008990318118948834], [1.74210024E12, 0.007113073338238902], [1.74210042E12, 0.007518796992481184], [1.74210036E12, 0.007782101167315172], [1.74210054E12, 0.004073807812125577], [1.74210048E12, 0.004082612872238239], [1.74210018E12, 0.010526315789473698]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7421006E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 126.0, "minX": 1.74210012E12, "maxY": 5343.0, "series": [{"data": [[1.74210012E12, 3705.0], [1.7421006E12, 1395.0], [1.7421003E12, 1049.0], [1.74210024E12, 5343.0], [1.74210042E12, 1263.0], [1.74210036E12, 1266.0], [1.74210054E12, 1252.0], [1.74210048E12, 1184.0], [1.74210018E12, 1309.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74210012E12, 140.0], [1.7421006E12, 161.0], [1.7421003E12, 160.0], [1.74210024E12, 128.0], [1.74210042E12, 158.0], [1.74210036E12, 161.0], [1.74210054E12, 165.0], [1.74210048E12, 160.0], [1.74210018E12, 126.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74210012E12, 1771.6000000000004], [1.7421006E12, 863.0], [1.7421003E12, 859.0], [1.74210024E12, 861.0], [1.74210042E12, 852.0], [1.74210036E12, 864.0], [1.74210054E12, 865.0], [1.74210048E12, 855.0], [1.74210018E12, 878.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74210012E12, 3268.2000000000007], [1.7421006E12, 960.0], [1.7421003E12, 935.829999999999], [1.74210024E12, 5164.38], [1.74210042E12, 929.0], [1.74210036E12, 1034.6000000000004], [1.74210054E12, 1018.0], [1.74210048E12, 995.7500000000018], [1.74210018E12, 1130.2399999999998]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74210012E12, 811.0], [1.7421006E12, 785.0], [1.7421003E12, 782.0], [1.74210024E12, 785.0], [1.74210042E12, 780.0], [1.74210036E12, 784.0], [1.74210054E12, 787.0], [1.74210048E12, 780.0], [1.74210018E12, 787.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.74210012E12, 2880.4], [1.7421006E12, 892.0], [1.7421003E12, 883.0499999999997], [1.74210024E12, 892.0], [1.74210042E12, 877.0], [1.74210036E12, 892.5], [1.74210054E12, 891.0], [1.74210048E12, 883.0], [1.74210018E12, 908.1999999999998]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7421006E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 5.0, "maxY": 5451.0, "series": [{"data": [[6.0, 4967.0], [15.0, 429.0], [20.0, 744.0], [27.0, 797.0], [30.0, 797.0], [42.0, 943.5], [48.0, 790.0], [51.0, 769.0], [50.0, 780.0], [53.0, 892.0], [55.0, 800.0], [57.0, 782.0], [58.0, 788.0], [59.0, 783.0], [61.0, 786.0], [60.0, 782.0], [62.0, 775.0], [63.0, 783.0], [65.0, 785.0], [66.0, 786.0], [64.0, 776.0], [67.0, 782.0], [71.0, 790.5], [68.0, 776.0], [69.0, 776.0], [70.0, 793.5], [74.0, 776.0], [72.0, 779.0], [73.0, 787.0], [75.0, 777.0], [79.0, 781.5], [77.0, 789.0], [76.0, 789.0], [78.0, 778.5], [83.0, 780.5], [80.0, 786.0], [81.0, 780.0], [82.0, 817.0], [86.0, 787.0], [87.0, 786.0], [85.0, 787.0], [89.0, 779.0], [90.0, 795.0], [88.0, 786.0], [91.0, 781.0], [94.0, 793.0], [92.0, 830.0], [95.0, 782.5], [93.0, 783.0], [99.0, 794.0], [97.0, 788.0], [98.0, 801.0], [102.0, 785.0], [103.0, 789.5], [101.0, 786.0], [100.0, 796.0], [107.0, 783.0], [106.0, 783.0], [105.0, 782.0], [104.0, 789.5], [110.0, 778.5], [109.0, 781.0], [111.0, 776.0], [115.0, 782.0], [113.0, 774.0], [129.0, 738.0], [201.0, 1525.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[57.0, 1.0], [58.0, 5298.5], [62.0, 1.0], [63.0, 1.0], [65.0, 1.0], [66.0, 1.0], [64.0, 1.0], [67.0, 1.0], [71.0, 1.0], [68.0, 1.0], [69.0, 1.0], [70.0, 1.0], [72.0, 1.0], [73.0, 1.0], [74.0, 1.5], [75.0, 1.0], [76.0, 1.0], [79.0, 0.5], [77.0, 1.0], [5.0, 1.0], [83.0, 1.0], [86.0, 2.0], [85.0, 1.0], [88.0, 1.0], [90.0, 1.0], [92.0, 2.0], [95.0, 2.0], [94.0, 2.0], [99.0, 1.0], [6.0, 5451.0], [97.0, 0.0], [98.0, 1.0], [103.0, 2.0], [102.0, 2.0], [101.0, 1.0], [107.0, 1.0], [105.0, 1.0], [109.0, 1.0], [115.0, 1.0], [113.0, 1.0], [129.0, 2.0], [20.0, 1.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 201.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 5.0, "maxY": 5451.0, "series": [{"data": [[6.0, 4967.0], [15.0, 429.0], [20.0, 744.0], [27.0, 797.0], [30.0, 797.0], [42.0, 943.5], [48.0, 790.0], [51.0, 769.0], [50.0, 780.0], [53.0, 892.0], [55.0, 800.0], [57.0, 782.0], [58.0, 788.0], [59.0, 783.0], [61.0, 786.0], [60.0, 782.0], [62.0, 775.0], [63.0, 783.0], [65.0, 785.0], [66.0, 786.0], [64.0, 776.0], [67.0, 782.0], [71.0, 790.5], [68.0, 776.0], [69.0, 776.0], [70.0, 793.5], [74.0, 776.0], [72.0, 779.0], [73.0, 787.0], [75.0, 777.0], [79.0, 781.5], [77.0, 789.0], [76.0, 789.0], [78.0, 778.5], [83.0, 780.5], [80.0, 786.0], [81.0, 780.0], [82.0, 817.0], [86.0, 787.0], [87.0, 786.0], [85.0, 787.0], [89.0, 779.0], [90.0, 795.0], [88.0, 786.0], [91.0, 781.0], [94.0, 793.0], [92.0, 830.0], [95.0, 782.5], [93.0, 783.0], [99.0, 794.0], [97.0, 788.0], [98.0, 801.0], [102.0, 785.0], [103.0, 789.5], [101.0, 786.0], [100.0, 796.0], [107.0, 783.0], [106.0, 783.0], [105.0, 782.0], [104.0, 789.5], [110.0, 778.5], [109.0, 781.0], [111.0, 776.0], [115.0, 782.0], [113.0, 774.0], [129.0, 738.0], [201.0, 1525.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[57.0, 1.0], [58.0, 5298.5], [62.0, 1.0], [63.0, 1.0], [65.0, 1.0], [66.0, 1.0], [64.0, 1.0], [67.0, 1.0], [71.0, 1.0], [68.0, 1.0], [69.0, 1.0], [70.0, 1.0], [72.0, 1.0], [73.0, 1.0], [74.0, 1.5], [75.0, 1.0], [76.0, 1.0], [79.0, 0.5], [77.0, 1.0], [5.0, 1.0], [83.0, 1.0], [86.0, 2.0], [85.0, 1.0], [88.0, 1.0], [90.0, 1.0], [92.0, 2.0], [95.0, 2.0], [94.0, 2.0], [99.0, 1.0], [6.0, 5451.0], [97.0, 0.0], [98.0, 1.0], [103.0, 2.0], [102.0, 2.0], [101.0, 1.0], [107.0, 1.0], [105.0, 1.0], [109.0, 1.0], [115.0, 1.0], [113.0, 1.0], [129.0, 2.0], [20.0, 1.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 201.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 25.35, "minX": 1.74210012E12, "maxY": 72.8, "series": [{"data": [[1.74210012E12, 25.35], [1.7421006E12, 41.3], [1.7421003E12, 72.31666666666666], [1.74210024E12, 67.96666666666667], [1.74210042E12, 66.48333333333333], [1.74210036E12, 72.8], [1.74210054E12, 69.55], [1.74210048E12, 69.4], [1.74210018E12, 71.23333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7421006E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.74210012E12, "maxY": 71.15, "series": [{"data": [[1.74210012E12, 23.916666666666668], [1.7421006E12, 42.13333333333333], [1.7421003E12, 70.63333333333334], [1.74210024E12, 66.26666666666667], [1.74210042E12, 64.53333333333333], [1.74210036E12, 71.15], [1.74210054E12, 69.55], [1.74210048E12, 69.4], [1.74210018E12, 69.58333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.74210012E12, 0.5833333333333334], [1.7421003E12, 1.6666666666666667], [1.74210024E12, 1.6666666666666667], [1.74210042E12, 1.0833333333333333], [1.74210036E12, 1.6666666666666667], [1.74210018E12, 1.6666666666666667]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.74210024E12, 0.016666666666666666], [1.74210042E12, 0.8833333333333333]], "isOverall": false, "label": "500", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7421006E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.5833333333333334, "minX": 1.74210012E12, "maxY": 71.15, "series": [{"data": [[1.74210012E12, 0.5833333333333334], [1.7421003E12, 1.6666666666666667], [1.74210024E12, 1.6833333333333333], [1.74210042E12, 1.9666666666666666], [1.74210036E12, 1.6666666666666667], [1.74210018E12, 1.6666666666666667]], "isOverall": false, "label": "HTTP Request-failure", "isController": false}, {"data": [[1.74210012E12, 23.916666666666668], [1.7421006E12, 42.13333333333333], [1.7421003E12, 70.63333333333334], [1.74210024E12, 66.26666666666667], [1.74210042E12, 64.53333333333333], [1.74210036E12, 71.15], [1.74210054E12, 69.55], [1.74210048E12, 69.4], [1.74210018E12, 69.58333333333333]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7421006E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.5833333333333334, "minX": 1.74210012E12, "maxY": 71.15, "series": [{"data": [[1.74210012E12, 23.916666666666668], [1.7421006E12, 42.13333333333333], [1.7421003E12, 70.63333333333334], [1.74210024E12, 66.26666666666667], [1.74210042E12, 64.53333333333333], [1.74210036E12, 71.15], [1.74210054E12, 69.55], [1.74210048E12, 69.4], [1.74210018E12, 69.58333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.74210012E12, 0.5833333333333334], [1.7421003E12, 1.6666666666666667], [1.74210024E12, 1.6833333333333333], [1.74210042E12, 1.9666666666666666], [1.74210036E12, 1.6666666666666667], [1.74210018E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7421006E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

