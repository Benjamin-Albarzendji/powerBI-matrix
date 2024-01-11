
this.viewModel.hasSelection=this.selectionManager.hasSelection(),
this.viewModel.updateSelected(this.selectionManager.getSelectionIds()),
o.render(i.createElement(f.Z,{viewModel:this.viewModel,pbivizJson:k,colorPalette:this.host.colorPalette,onPropertiesChange:this.saveProperties,downloadExcel:(e,t,r)=>
    
        
        const n=this.viewModel.settings;try{const o=yield(0,_.w)(e,t,r,n);
            
            onSelect:t=>{
                var r,n;

                if(this.host.hostCapabilities.allowInteractions&&t.row.identity)
                {let o=this.createSelectionBuilder(t,e);
                    
                    if(t.matrixColumn)
                    {const i=null===(r=e.dataViews[0].matrix)||void 0===r?void 0:r.columns.levels;
                        for(let e=t.matrixColumn;
                            e;
                            e=e.parent)
                        (null===(n=e.matrixNode)||void 0===n?void 0:n.identity)&&i&&(o=o.withMatrixNode(e.matrixNode,i));
        
                    const a=o.createSelectionId();
                    this.selectionManager.select(a,t.multiSelect)}
                    
                    else
                    {const e=o.createSelectionId();this.selectionManager.select(e,t.multiSelect)}this.render(e)}},
                    



                    
                    onCellContextMenu:t=>{var r,n;try{if(this.host.hostCapabilities.allowInteractions&&t.row&&t.row.identity)
                        {let o=this.createSelectionBuilder(t,e);if(t.matrixColumn){const i=null===(r=e.dataViews[0].matrix)||void 0===r?void 0:r.columns.levels;
                        for(let e=t.matrixColumn;e;e=e.parent)(null===(n=e.matrixNode)||void 0===n?void 0:n.identity)&&i&&(o=o.withMatrixNode(e.matrixNode,i))}
                    
                    const i=o.createSelectionId();this.selectionManager.showContextMenu(i,{x:t.event.clientX,y:t.event.clientY}),t.event.preventDefault()}}catch(e){}},editMode:1===e.editMode,needToShowTip:this.needToShowTip}),
                    this.target)}createSelectionBuilder(e,t,r=!0){var n;const o=(null===(n=t.dataViews[0].matrix)||void 0===n?void 0:n.rows.levels)||{};
                    
                    let i=this.host.createSelectionIdBuilder().withMatrixNode(e.row.node,o);if(r&&o){let t=e.row.parentCompositeId||e.row.parentId;
                    for(;t;){const e=this.viewModel.data.find((e=>e.compositeId==t));if(!(null==e?void 0:e.node))break;i=i.withMatrixNode(null==e?void 0:e.node,o),t=e.parentCompositeId||e.parentId}}return i}