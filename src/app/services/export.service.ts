import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private isExportMode = false;

  /**
   * 启用导出模式
   * 在导出PNG前调用，将渐变色文字转换为纯色
   */
  enableExportMode(): void {
    this.isExportMode = true;
    document.body.classList.add('export-mode');
    
    // 强制重新计算样式
    const elements = document.querySelectorAll('.highlight, .brand-text');
    elements.forEach(el => {
      const element = el as HTMLElement;
      element.style.display = 'none';
      element.offsetHeight; // 触发重排
      element.style.display = '';
    });
  }

  /**
   * 禁用导出模式
   * 在导出PNG后调用，恢复渐变色文字效果
   */
  disableExportMode(): void {
    this.isExportMode = false;
    document.body.classList.remove('export-mode');
    
    // 强制重新计算样式，确保渐变色效果恢复
    const elements = document.querySelectorAll('.highlight, .brand-text');
    elements.forEach(el => {
      const element = el as HTMLElement;
      element.style.display = 'none';
      element.offsetHeight; // 触发重排
      element.style.display = '';
    });
  }

  /**
   * 检查是否处于导出模式
   */
  isInExportMode(): boolean {
    return this.isExportMode;
  }

  /**
   * 调试方法：检查渐变色元素的状态
   */
  debugGradientElements(): void {
    const elements = document.querySelectorAll('.highlight, .brand-text');
    console.log('渐变色元素状态检查:');
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      console.log(`元素 ${index + 1}:`, {
        background: computedStyle.background,
        color: computedStyle.color,
        webkitTextFillColor: computedStyle.webkitTextFillColor,
        hasExportMode: document.body.classList.contains('export-mode')
      });
    });
  }

  /**
   * 导出元素为PNG
   * @param element 要导出的DOM元素
   * @param filename 文件名
   */
  async exportElementAsPNG(element: HTMLElement, filename: string = 'export.png'): Promise<void> {
    try {
      // 启用导出模式
      this.enableExportMode();
      
      // 等待样式应用
      await this.delay(300);
      
      // 使用html2canvas导出
      const canvas = await this.captureElement(element);
      
      // 创建下载链接
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
    } catch (error) {
      console.error('导出失败:', error);
      throw error;
    } finally {
      // 恢复正常模式
      this.disableExportMode();
      
      // 调试：验证恢复状态
      console.log('导出完成，样式已恢复');
      setTimeout(() => {
        this.debugGradientElements();
      }, 100);
    }
  }

  /**
   * 使用html2canvas捕获元素
   */
  private async captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
    // 动态导入html2canvas
    const html2canvas = (await import('html2canvas')).default;
    
    // 临时修改渐变色文字样式
    const gradientElements = element.querySelectorAll('.highlight, .brand-text');
    const originalStyles: { element: HTMLElement; styles: { [key: string]: string } }[] = [];
    
    gradientElements.forEach(el => {
      const element = el as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      
      // 保存原始样式
      originalStyles.push({
        element,
        styles: {
          background: computedStyle.background,
          backgroundClip: computedStyle.backgroundClip,
          webkitBackgroundClip: computedStyle.webkitBackgroundClip,
          webkitTextFillColor: computedStyle.webkitTextFillColor,
          color: computedStyle.color
        }
      });
      
      // 强制应用纯色样式
      element.style.setProperty('background', 'none', 'important');
      element.style.setProperty('background-clip', 'initial', 'important');
      element.style.setProperty('-webkit-background-clip', 'initial', 'important');
      element.style.setProperty('-webkit-text-fill-color', 'initial', 'important');
      element.style.setProperty('color', '#667eea', 'important');
    });
    
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // 提高分辨率
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight
      });
      
      return canvas;
    } finally {
      // 恢复原始样式
      originalStyles.forEach(({ element, styles }) => {
        Object.entries(styles).forEach(([property, value]) => {
          element.style.setProperty(property, value);
        });
      });
    }
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
