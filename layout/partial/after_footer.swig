<!-- Scripts -->
<!-- build:js js/dist.o2.js -->
{{ js('js/lunr') }}
{{ js('js/debounce') }}
{{ js('js/jquery') }}
{{ js('js/xhogan') }}
{{ js('js/hammer') }}
{{ js('assets/bootstrap/js/bootstrap') }}
{{ js('js/lang_select') }}
{{ js('js/toc') }}
{{ js('js/mobile_nav') }}
{{ js('js/util') }}
{{ js('js/main') }}
{{ js('js/search') }}
{% if theme.fancybox %}
{{ js('assets/fancybox/jquery.fancybox') }}
{{ js('js/fancybox') }}
{% endif %}
<!-- endbuild -->

{% if page.comments and theme.duoshuo.shortname and theme.duoshuo.ua_enable %}
<!-- build:js js/dist.duoshuo.js -->
{{ js('js/ua-parser.min') }}
{{ js('js/duoshuo') }}
<!-- endbuild -->
{% endif %}

{% if theme.busuanzi %}
<!--busuanzi-->
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
{% endif %}

{% if config.baidu_push or theme.baidu_push %}
<script>
(function(){
    var bp = document.createElement('script');
    bp.src = '//push.zhanzhang.baidu.com/push.js';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>
{% endif %}
