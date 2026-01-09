document.addEventListener('DOMContentLoaded', function() {
    const excelFileInput = document.getElementById('excelFile');
    const convertBtn = document.getElementById('convertBtn');
    const previewContainer = document.getElementById('previewContainer');
    const downloadSection = document.getElementById('downloadSection');
    const downloadBtn = document.getElementById('downloadBtn');
    let canvas = null;

    // 初始化应用
    function initApp() {
        setupFileHandlers();
        setupDragAndDrop();
        checkForSharedFile();
    }

    // 设置文件处理
    function setupFileHandlers() {
        // 处理文件输入变化
        excelFileInput.addEventListener('change', function(e) {
            handleFile(e.target.files[0]);
        });

        // 处理转换按钮点击
        convertBtn.addEventListener('click', function() {
            const file = excelFileInput.files[0];
            if (!file) {
                alert('请先选择 Excel 文件');
                return;
            }
            handleFile(file);
        });
    }

    // 设置拖放功能
    function setupDragAndDrop() {
        const container = document.querySelector('.container');
        
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            container.style.border = '2px dashed #3498db';
        });

        container.addEventListener('dragleave', function() {
            container.style.border = 'none';
        });

        container.addEventListener('drop', function(e) {
            e.preventDefault();
            container.style.border = 'none';
            
            const file = e.dataTransfer.files[0];
            if (file) {
                handleFile(file);
            }
        });
    }

    // 检查是否有通过分享传入的文件
    function checkForSharedFile() {
        // 检查 URL 参数
        const urlParams = new URLSearchParams(window.location.search);
        const fileParam = urlParams.get('file');
        
        // 检查是否有文件分享
        if (navigator.share) {
            console.log('设备支持分享功能');
        }
        
        // 检查 File System Access API
        if ('showOpenFilePicker' in window) {
            console.log('设备支持文件选择器');
        }
    }

    // 处理文件
    function handleFile(file) {
        if (!file) return;
        
        // 检查文件类型
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            '.xlsx',
            '.xls'
        ];
        
        const fileName = file.name.toLowerCase();
        const isExcelFile = allowedTypes.some(type => 
            file.type === type || fileName.endsWith(type)
        );
        
        if (!isExcelFile) {
            alert('请选择 Excel 文件（.xlsx 或 .xls）');
            return;
        }

        // 显示加载状态
        previewContainer.innerHTML = '<div style="text-align: center; padding: 40px;">正在处理文件...</div>';

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const htmlTable = XLSX.utils.sheet_to_html(worksheet, {
                    header: '<tr class="header">',
                    footer: '</tr>',
                    trim: true,
                    raw: false
                });

                previewContainer.innerHTML = htmlTable;
                const tableElement = previewContainer.querySelector('table');
                if (tableElement) {
                    tableElement.classList.add('excel-table');
                    generateImage(tableElement);
                }
            } catch (error) {
                console.error('转换错误:', error);
                previewContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: red;">转换失败，请检查文件格式是否正确</div>';
            }
        };
        
        reader.onerror = function() {
            previewContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: red;">文件读取失败，请重试</div>';
        };
        
        reader.readAsArrayBuffer(file);
    }

    function generateImage(tableElement) {
        html2canvas(tableElement, {
            scale: 3,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: tableElement.offsetWidth,
            height: tableElement.offsetHeight,
            windowWidth: tableElement.scrollWidth,
            windowHeight: tableElement.scrollHeight
        }).then(function(generatedCanvas) {
            canvas = generatedCanvas;
            downloadSection.style.display = 'block';
            
            // 在 iOS 上自动提示下载
            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
                setTimeout(() => {
                    if (canvas) {
                        alert('转换完成，请点击下载按钮保存图片');
                    }
                }, 500);
            }
        }).catch(function(error) {
            console.error('生成图片错误:', error);
            previewContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: red;">生成图片失败，请重试</div>';
        });
    }

    downloadBtn.addEventListener('click', function() {
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'excel-to-image.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            
            // 在 iOS 上特殊处理
            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
                // 尝试直接打开图片
                window.open(link.href, '_blank');
            } else {
                link.click();
            }
        }
    });

    // 注册文件处理程序（用于 PWA）
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('ServiceWorker 注册失败:', err);
        });
    }

    // 初始化应用
    initApp();
});