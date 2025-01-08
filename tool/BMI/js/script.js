// BMI 分类信息
const BMI_CATEGORIES = {
    underweight: { max: 18.5, label: '体重过轻', color: '#3498db', advice: '建议适当增加营养摄入，注意均衡饮食。' },
    normal: { max: 24, label: '体重正常', color: '#2ecc71', advice: '继续保持健康的生活方式。' },
    overweight: { max: 28, label: '超重', color: '#f1c40f', advice: '建议控制饮食，增加运动量。' },
    obese: { max: Infinity, label: '肥胖', color: '#e74c3c', advice: '建议咨询医生，制定减重计划。' }
};

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 验证输入
function validateInput(input, errorId) {
    const value = parseFloat(input.value);
    const errorElement = document.getElementById(errorId);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (isNaN(value)) {
        errorElement.textContent = '请输入有效数字';
        errorElement.style.display = 'block';
        return false;
    }
    
    if (value < min || value > max) {
        errorElement.textContent = `请输入 ${min} 到 ${max} 之间的数值`;
        errorElement.style.display = 'block';
        return false;
    }
    
    errorElement.style.display = 'none';
    return true;
}

// 计算 BMI
function calculateBMI() {
    const height = document.getElementById('height');
    const weight = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    
    // 验证输入
    const isHeightValid = validateInput(height, 'height-error');
    const isWeightValid = validateInput(weight, 'weight-error');
    
    if (!isHeightValid || !isWeightValid) {
        resultDiv.classList.remove('show');
        return;
    }
    
    const heightValue = parseFloat(height.value);
    const weightValue = parseFloat(weight.value);
    
    if (heightValue && weightValue) {
        const heightInMeters = heightValue / 100;
        const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(1);
        
        const bmiNumber = document.getElementById('bmi-number');
        const bmiCategory = document.getElementById('bmi-category');
        const bmiInfo = document.getElementById('bmi-info');
        
        // 确定 BMI 分类
        let category = BMI_CATEGORIES.obese;
        for (const [key, data] of Object.entries(BMI_CATEGORIES)) {
            if (bmi < data.max) {
                category = data;
                break;
            }
        }
        
        // 更新显示
        bmiNumber.textContent = bmi;
        bmiCategory.textContent = `体重状态：${category.label}`;
        bmiInfo.textContent = category.advice;
        
        resultDiv.style.backgroundColor = `${category.color}20`;
        resultDiv.style.borderLeft = `4px solid ${category.color}`;
        resultDiv.classList.add('show');
    }
}

// 页面加载完成后设置事件监听
document.addEventListener('DOMContentLoaded', function() {
    const debouncedCalculate = debounce(calculateBMI, 300);
    
    const inputs = ['height', 'weight'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', debouncedCalculate);
        input.addEventListener('blur', () => {
            validateInput(input, `${id}-error`);
        });
    });
}); 