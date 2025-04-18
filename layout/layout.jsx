const { Component } = require('inferno');
const classname = require('hexo-component-inferno/lib/util/classname');
const Head = require('./common/head');
const Navbar = require('./common/navbar');
const Widgets = require('./common/widgets');
const Footer = require('./common/footer');
const Scripts = require('./common/scripts');
const Search = require('./common/search');

module.exports = class extends Component {
    render() {
        const { site, config, page, helper, body } = this.props;

        const language = page.lang || page.language || config.language;
        const columnCount = Widgets.getColumnCount(config.widgets, config, page);

        return <html lang={language ? language.substr(0, 2) : ''}>
            <Head site={site} config={config} helper={helper} page={page} />
            <body class={`is-${columnCount}-column`}>
                <script type="text/javascript" src="/js/imaegoo/night.js"></script>
                <canvas id="universe"></canvas>
                <canvas id="flower"></canvas>

                <Navbar config={config} helper={helper} page={page} />
                <section class="section">
                    <div class="container">
                        <div class="columns">
                            <div class={classname({
                                column: true,
                                'order-2': true,
                                'column-main': true,
                                'is-12': columnCount === 1,
                                'is-8-tablet is-8-desktop is-8-widescreen': columnCount === 2,
                                'is-8-tablet is-8-desktop is-6-widescreen': columnCount === 3
                            })} dangerouslySetInnerHTML={{ __html: body }}></div>
                            {/* imaegoo fix: 防止左边栏已加载，右边栏未加载时，内容区不居中的问题，注意禁止用 js 解决，用两组 style 来控制它们加载完成后再显示 */}
                            <style dangerouslySetInnerHTML={{ __html: '.column.column-left,.column.column-right{display:none}' }}></style>
                            <Widgets site={site} config={config} helper={helper} page={page} position={'left'} />
                            <Widgets site={site} config={config} helper={helper} page={page} position={'right'} />
                            {/* imaegoo fix: 到这里时 widgets 已经加载完毕，显示 widgets */}
                            <style dangerouslySetInnerHTML={{ __html: '.column.column-left,.column.column-right{display:block}' }}></style>
                        </div>
                    </div>
                </section>
                <Footer config={config} helper={helper} />
                <Scripts site={site} config={config} helper={helper} page={page} />
                <Search config={config} helper={helper} />

                <script type="text/javascript" src="/js/imaegoo/imaegoo.js"></script>
                <script type="text/javascript" src="/js/imaegoo/universe.js"></script>
                <script type="text/javascript" src="/js/imaegoo/falling-petals.js"></script>
                {/* <script type="text/javascript" src="/js/live2d/autoload.js"></script> */}
            </body>
        </html>;
    }
};
